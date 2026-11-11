(() => {
  function parseVotes(input) {
    const lines = input.split(/\r?\n/).filter((line) => line.trim());
    if (lines.length === 0) {
      throw new Error("Enter one or more votes, one per line.");
    }

    return lines.map((line, lineIndex) => {
      const match = /^ISO-(\d+)\s+(\d+)$/.exec(line.trim());
      if (!match) {
        throw new Error(`Invalid vote on line ${lineIndex + 1}. Use ISO-<bases> <vote>.`);
      }

      return { standard: match[1], vote: match[2] };
    });
  }

  function decodeVote(standard, vote) {
    let value = 0n;
    for (let position = 0; position < vote.length; position += 1) {
      const exponent = vote.length - position - 1;
      const baseIndex = (standard.length - 1 - (exponent % standard.length) + standard.length)
        % standard.length;
      const base = BigInt(standard[baseIndex]);
      const digit = BigInt(vote[position]);
      value += digit * base ** BigInt(exponent);
    }

    return value;
  }

  window.solveEC2603Part2 = function solveEC2603Part2(input) {
    return parseVotes(input)
      .reduce((total, { standard, vote }) => total + decodeVote(standard, vote), 0n)
      .toString();
  };
})();
