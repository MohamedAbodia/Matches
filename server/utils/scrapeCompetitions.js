import { competitionEvaluator } from './competitionEvaluator';

export async function scrapeCompetitions(page, competitionsNames) {
  const allCompetitions = await Promise.all(
    competitionsNames.map(async (competitionName) => {
      const competitionSelector = `div:has(> span.comp_head:has-text("${competitionName}"))`;

      // This returns a locator for each selector, each locator item consists of one or more matching elements
      const competitionNodes = page.locator(competitionSelector);

      // This evaluates every set of matching elements for each locator and returns the data that are ready to be used in the frontend
      const competitionMatches = await competitionNodes.evaluateAll(
        competitionEvaluator
      );

      // Filter the array from null values
      const matches = competitionMatches.filter((match) => match !== null);

      // Add only the competitions that has matches and set the others to null (to be filtered)
      return matches.length
        ? {
            name: competitionName,
            matches,
          }
        : null;
    })
  );

  // Filter results to return only non-nullable items
  return allCompetitions.filter((competition) => competition !== null);
}
