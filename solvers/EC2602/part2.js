(() => {
  function parseGroups(input) {
    const lines = input.split(/\r?\n/).filter((line) => line.trim());
    if (lines.length === 0) {
      throw new Error("Enter one or more lines of alloy comparisons.");
    }

    return lines.map((line, lineIndex) => {
      const comparisons = line.trim().split(/\s+/);
      return comparisons.map((comparison) => {
        const match = /^(\d+)([<>])(\d+)$/.exec(comparison);
        if (!match) {
          throw new Error(`Invalid comparison on line ${lineIndex + 1}: "${comparison}".`);
        }

        const [, left, relation, right] = match;
        if (left === right) {
          throw new Error(`An alloy cannot be compared with itself on line ${lineIndex + 1}.`);
        }

        return relation === ">"
          ? [left, right]
          : [right, left];
      });
    });
  }

  function getUniqueHardestToSoftestOrder(comparisons) {
    const harderThan = new Map();
    const indegree = new Map();

    for (const [harder, softer] of comparisons) {
      if (!harderThan.has(harder)) harderThan.set(harder, new Set());
      if (!harderThan.has(softer)) harderThan.set(softer, new Set());
      if (!indegree.has(harder)) indegree.set(harder, 0);
      if (!indegree.has(softer)) indegree.set(softer, 0);

      if (!harderThan.get(harder).has(softer)) {
        harderThan.get(harder).add(softer);
        indegree.set(softer, indegree.get(softer) + 1);
      }
    }

    const order = [];
    while (indegree.size > 0) {
      const available = [...indegree.entries()]
        .filter(([, degree]) => degree === 0)
        .map(([alloy]) => alloy);

      if (available.length === 0) {
        throw new Error("The comparisons contain a cycle, so no valid alloy order exists.");
      }
      if (available.length > 1) {
        throw new Error("The comparisons do not determine a unique alloy order.");
      }

      const hardest = available[0];
      order.push(hardest);
      indegree.delete(hardest);
      for (const softer of harderThan.get(hardest)) {
        indegree.set(softer, indegree.get(softer) - 1);
      }
    }

    return order;
  }

  window.solveEC2602Part2 = function solveEC2602Part2(input) {
    return parseGroups(input)
      .reduce((checksum, group) => {
        const orderedAlloys = getUniqueHardestToSoftestOrder(group);
        return checksum + BigInt(orderedAlloys.join(""));
      }, 0n)
      .toString();
  };
})();
