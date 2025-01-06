// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DreamContest is ReentrancyGuard {
    struct Contest {
        string title;
        string description;
        string goal;
        uint256 startTime;
        uint256 endTime;
        uint256 totalStaked;
        uint256 minStake;
        uint256 participantCount;
        bool active;
    }

    struct Participant {
        uint256 stakedAmount;
        bool hasCompleted;
        bool hasWithdrawn;
    }

    mapping(uint256 => Contest) public contests;
    mapping(uint256 => mapping(address => Participant)) public contestParticipants;
    uint256 public contestCount;

    event ContestCreated(
        uint256 indexed contestId,
        string title,
        uint256 startTime,
        uint256 endTime,
        uint256 minStake
    );

    event Staked(
        uint256 indexed contestId,
        address indexed participant,
        uint256 amount
    );

    event GoalCompleted(
        uint256 indexed contestId,
        address indexed participant
    );

    event RewardsClaimed(
        uint256 indexed contestId,
        address indexed participant,
        uint256 amount
    );

    // Add the constructor to initialize Ownable with msg.sender
    constructor() {}

    function createContest(
        string memory _title,
        string memory _description,
        string memory _goal,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _minStake
    ) external  {
        require(_startTime > block.timestamp, "Start time must be in future");
        require(_endTime > _startTime, "End time must be after start time");
        require(_minStake > 0, "Minimum stake must be greater than 0");

        uint256 contestId = contestCount++;

        contests[contestId] = Contest({
            title: _title,
            description: _description,
            goal: _goal,
            startTime: _startTime,
            endTime: _endTime,
            totalStaked: 0,
            minStake: _minStake,
            participantCount: 0,
            active: true
        });

        emit ContestCreated(
            contestId,
            _title,
            _startTime,
            _endTime,
            _minStake
        );
    }

    function joinContest(uint256 _contestId) external payable nonReentrant {
        Contest storage contest = contests[_contestId];
        require(contest.active, "Contest is not active");
        require(block.timestamp >= contest.startTime, "Contest has not started");
        require(block.timestamp < contest.endTime, "Contest has ended");
        require(msg.value >= contest.minStake, "Stake amount below minimum");
        require(
            contestParticipants[_contestId][msg.sender].stakedAmount == 0,
            "Already participating"
        );

        contestParticipants[_contestId][msg.sender] = Participant({
            stakedAmount: msg.value,
            hasCompleted: false,
            hasWithdrawn: false
        });

        contest.totalStaked += msg.value;
        contest.participantCount++;

        emit Staked(_contestId, msg.sender, msg.value);
    }

    function completeGoal(uint256 _contestId, address _participant) external  {
        Contest storage contest = contests[_contestId];
        require(contest.active, "Contest is not active");
        require(block.timestamp <= contest.endTime, "Contest has ended");

        Participant storage participant = contestParticipants[_contestId][_participant];
        require(participant.stakedAmount > 0, "Not a participant");
        require(!participant.hasCompleted, "Already completed");

        participant.hasCompleted = true;

        emit GoalCompleted(_contestId, _participant);
    }

    function claimRewards(uint256 _contestId) external nonReentrant {
        Contest storage contest = contests[_contestId];
        require(block.timestamp > contest.endTime, "Contest not ended");

        Participant storage participant = contestParticipants[_contestId][msg.sender];
        require(participant.stakedAmount > 0, "Not a participant");
        require(!participant.hasWithdrawn, "Already withdrawn");
        require(participant.hasCompleted, "Goal not completed");

        uint256 reward = participant.stakedAmount;
        participant.hasWithdrawn = true;

        (bool success, ) = payable(msg.sender).call{value: reward}("");
        require(success, "Transfer failed");

        emit RewardsClaimed(_contestId, msg.sender, reward);
    }

    function getContest(uint256 _contestId) external view returns (
        string memory title,
        string memory description,
        string memory goal,
        uint256 startTime,
        uint256 endTime,
        uint256 totalStaked,
        uint256 minStake,
        uint256 participantCount,
        bool active
    ) {
        Contest storage contest = contests[_contestId];
        return (
            contest.title,
            contest.description,
            contest.goal,
            contest.startTime,
            contest.endTime,
            contest.totalStaked,
            contest.minStake,
            contest.participantCount,
            contest.active
        );
    }

    function getParticipant(uint256 _contestId, address _participant) external view returns (
        uint256 stakedAmount,
        bool hasCompleted,
        bool hasWithdrawn
    ) {
        Participant storage participant = contestParticipants[_contestId][_participant];
        return (
            participant.stakedAmount,
            participant.hasCompleted,
            participant.hasWithdrawn
        );
    }
}
