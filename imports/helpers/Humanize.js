const Humanize = require('humanize-duration')
  .humanizer({
    language: 'shortEn',
    languages: {
      shortEn: {
        y: () => 'y',
        mo: () => 'mo',
        w: () => 'w',
        d: () => 'd',
        h: () => 'h',
        m: () => 'm',
        s: () => 's',
        ms: () => 'ms'
      }
    },
    round: true,
    spacer: ''
  });

export default Humanize;
