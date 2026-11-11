(() => {
  function parseVotes(input) {
    const lines = input.split(/\r?\n/).filter((line) => line.trim());
    if (lines.length === 0) {
      throw new Error("Enter one or more votes, one per line.");
    }

    return lines.map((line, lineIndex) => {
      const match = /^ISO2-(\d+)\s+(\d+)$/.exec(line.trim());
      if (!match) {
        throw new Error(`Invalid vote on line ${lineIndex + 1}. Use ISO2-<bases> <vote>.`);
      }

      return { standard: match[1], vote: match[2] };
    });
  }

  function getPositionalWeights(standard, length) {
    const weights = [];
    for (let position = 0; position < length; position += 1) {
      const exponent = length - position - 1;
      const baseIndex = (standard.length - 1 - (exponent % standard.length) + standard.length)
        % standard.length;
      weights.push(BigInt(standard[baseIndex]) ** BigInt(exponent));
    }
    return weights;
  }

  function decodeVote(standard, vote) {
    const weights = getPositionalWeights(standard, vote.length);
    return [...vote].reduce(
      (value, digit, position) => value + BigInt(digit) * weights[position],
      0n
    );
  }

  function getSmallestRepresentation(target, weights) {
    const suffixMaximum = Array(weights.length + 1).fill(0n);
    for (let position = weights.length - 1; position >= 0; position -= 1) {
      suffixMaximum[position] = suffixMaximum[position + 1] + 9n * weights[position];
    }

    const memo = new Map();
    function canMake(position, remaining) {
      if (remaining < 0n || remaining > suffixMaximum[position]) return false;
      if (position === weights.length) return remaining === 0n;

      const key = `${position}:${remaining}`;
      if (memo.has(key)) return memo.get(key);

      const minimumDigit = position === 0 ? 1 : 0;
      for (let digit = minimumDigit; digit <= 9; digit += 1) {
        const nextRemaining = remaining - BigInt(digit) * weights[position];
        if (canMake(position + 1, nextRemaining)) {
          memo.set(key, true);
          return true;
        }
      }

      memo.set(key, false);
      return false;
    }

    if (!canMake(0, target)) return null;

    let remaining = target;
    let representation = "";
    for (let position = 0; position < weights.length; position += 1) {
      const minimumDigit = position === 0 ? 1 : 0;
      for (let digit = minimumDigit; digit <= 9; digit += 1) {
        const nextRemaining = remaining - BigInt(digit) * weights[position];
        if (canMake(position + 1, nextRemaining)) {
          representation += String(digit);
          remaining = nextRemaining;
          break;
        }
      }
    }

    return representation;
  }

  function hasSmallerRepresentation(standard, vote, value) {
    const numericVote = BigInt(vote).toString();
    for (let length = 1; length <= numericVote.length; length += 1) {
      const candidate = getSmallestRepresentation(
        value,
        getPositionalWeights(standard, length)
      );
      if (candidate === null) continue;
      if (length < numericVote.length || candidate < numericVote) return true;
      return false;
    }

    return false;
  }

  window.solveEC2603Part3 = function solveEC2603Part3(input) {
    return parseVotes(input)
      .reduce((total, { standard, vote }) => {
        const value = decodeVote(standard, vote);
        return hasSmallerRepresentation(standard, vote, value) ? total : total + value;
      }, 0n)
      .toString();
  };
})();
