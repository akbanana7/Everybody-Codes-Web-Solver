(() => {
  function parseVotes(input, prefix) {
    const lines = input.split(/\r?\n/).filter((line) => line.trim());
    if (lines.length === 0) {
      throw new Error("Enter one or more votes, one per line.");
    }

    return lines.map((line, lineIndex) => {
      const match = new RegExp(`^${prefix}-(\\d+)\\s+(\\d+)$`).exec(line.trim());
      if (!match) {
        throw new Error(`Invalid vote on line ${lineIndex + 1}. Use ${prefix}-<bases> <vote>.`);
      }

      return { standard: match[1], vote: match[2] };
    });
  }

  function decodeVote(standard, vote) {
    if (standard.length !== vote.length) {
      throw new Error("Part 1 requires the ISO standard and vote to have the same number of digits.");
    }

    let value = 0n;
    for (let position = 0; position < vote.length; position += 1) {
      const exponent = BigInt(vote.length - position - 1);
      const base = BigInt(standard[position]);
      const digit = BigInt(vote[position]);
      value += digit * base ** exponent;
    }

    return value;
  }

  window.solveEC2603Part1 = function solveEC2603Part1(input) {
    return parseVotes(input, "ISO")
      .reduce((total, { standard, vote }) => total + decodeVote(standard, vote), 0n)
      .toString();
  };
})();
