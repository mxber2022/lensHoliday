// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DreamContest is ReentrancyGuard, Ownable {
    struct Contest {
        string title;
        string description;
        string goal;
        uint256 startTime;
        uint256 endTime;
        uint256 registrationStartTime;
        uint256 registrationEndTime;
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
    mapping(uint256 => mapping(address => bool)) public registeredParticipants;
    uint256 public contestCount;

 constructor() {}

    event ContestCreated(
        uint256 indexed contestId,
        string title,
        uint256 startTime,
        uint256 endTime,
        uint256 registrationStartTime,
        uint256 registrationEndTime,
        uint256 minStake
    );

    event Registered(
        uint256 indexed contestId,
        address indexed participant
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

    function createContest(
        string memory _title,
        string memory _description,
        string memory _goal,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _registrationStartTime,
        uint256 _registrationEndTime,
        uint256 _minStake
    ) external onlyOwner {
        require(_startTime > block.timestamp, "Start time must be in future");
        require(_endTime > _startTime, "End time must be after start time");
        require(_registrationStartTime > block.timestamp, "Registration start time must be in future");
        require(_registrationEndTime > _registrationStartTime, "Registration end time must be after registration start");
        require(_registrationEndTime < _startTime, "Registration must end before contest starts");
        require(_minStake > 0, "Minimum stake must be greater than 0");

        uint256 contestId = contestCount++;

        contests[contestId] = Contest({
            title: _title,
            description: _description,
            goal: _goal,
            startTime: _startTime,
            endTime: _endTime,
            registrationStartTime: _registrationStartTime,
            registrationEndTime: _registrationEndTime,
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
            _registrationStartTime,
            _registrationEndTime,
            _minStake
        );
    }

    function registerForContest(uint256 _contestId) external payable nonReentrant {
        Contest storage contest = contests[_contestId];

        // Ensure the contest is active
        require(contest.active, "Contest is not active");

        // Ensure registration period is active
        require(block.timestamp >= contest.registrationStartTime, "Registration has not started");
        require(block.timestamp < contest.registrationEndTime, "Registration has ended");

        // Check if user has already registered
        require(!registeredParticipants[_contestId][msg.sender], "Already registered");

        // Ensure user sends enough Ether (stake)
        require(msg.value >= contest.minStake, "Stake amount below minimum");

        // Mark user as registered and store the staked amount
        registeredParticipants[_contestId][msg.sender] = true;
        contestParticipants[_contestId][msg.sender] = Participant({
            stakedAmount: msg.value,
            hasCompleted: false,
            hasWithdrawn: false
        });

        // Increase total staked in the contest
        contest.totalStaked += msg.value;
        contest.participantCount++;

        emit Registered(_contestId, msg.sender);
        emit Staked(_contestId, msg.sender, msg.value);
    }

    function joinContest(uint256 _contestId) external nonReentrant {
        Contest storage contest = contests[_contestId];

        // Ensure contest has started
        require(block.timestamp >= contest.startTime, "Contest has not started");
        require(block.timestamp < contest.endTime, "Contest has ended");

        // Ensure user is registered
        require(registeredParticipants[_contestId][msg.sender], "You must register first");

        // Ensure user has not already joined
        require(contestParticipants[_contestId][msg.sender].stakedAmount > 0, "Not a participant");

        // The user has already sent Ether during registration, so no need to send it again.
    }

    function completeGoal(uint256 _contestId, address _participant) external onlyOwner {
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
        uint256 registrationStartTime,
        uint256 registrationEndTime,
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
            contest.registrationStartTime,
            contest.registrationEndTime,
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
