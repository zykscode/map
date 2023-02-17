function processResults(data) {
  const results = {};

  // Iterate over each state in the data
  Object.entries(data).forEach(([state, value]) => {
    const { details, results: stateResults } = value;
    const { validVotes } = details;

    // Calculate the total number of votes for all parties in the state
    const totalVotes = Object.values(stateResults).reduce(
      (acc, val) => acc + val,
      0,
    );

    // Calculate the percentage of valid votes for each party
    const partyVotes = {};
    Object.entries(stateResults).forEach(([party, votes]) => {
      partyVotes[party] = {
        votes,
        percentage: ((votes / validVotes) * 100).toFixed(2),
      };
    });

    // Get the party with the highest number of votes
    const winner = Object.entries(stateResults).reduce((acc, val) =>
      val[1] > acc[1] ? val : acc,
    );

    results[state] = {
      winner: winner[0],
      partyVotes,
      registeredVoters: details.registeredVoters,
      accreditedVoters: details.accreditedVoters,
      validVotes,
      totalVotes,
    };
  });

  return results;
}
