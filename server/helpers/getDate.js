// Reasong for fixing the timezone option to 'Africa/Egypt' is to make the function agnostic to whatever platform it runs on
// For example, deploying the code to vercel without the timezone option will yield a date in Newyork timezone (-5 GMT)
// which is different from Cairo timezone (+2 GMT). Other platforms may use different timezones. This may lead to unwanted errors.

export function getDate() {
  return {
    today: () => {
      const date = new Date();

      // This outputs RTL ar-EG date in 'yy/mm/weekday ،dd' format
      const ar = date.toLocaleString('ar-EG', {
        timeZone: 'Africa/Cairo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        weekday: 'long',
      });

      // This outputs LTR en-us date in 'dd/mm/yy' format
      const enFullDate = date.toLocaleString('en-SG', {
        timeZone: 'Africa/Cairo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const [day, month, year] = enFullDate.split('/');
      const en = { day, month, year, fullDate: enFullDate };

      return { en, ar };
    },
  };
}
