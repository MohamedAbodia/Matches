// NOTE:
// Can't use import as this function runs in the browser (as it's passed to locator.evaluateAll).
// Browser environment isn't the same as the Node.js where we can import modules.
// getCompetitionMatches is the main functions, the rest is helper function that are used inside getCompetitionMatches

export function competitionEvaluator(CompetitionNodes) {
  return CompetitionNodes.map(getCompetitionMatches);

  function getCompetitionMatches(competitionNode) {
    const competition = formatCompetitionName(
      competitionNode.querySelector('.comp_head').textContent
    );
    const matchNode = competitionNode.nextElementSibling;

    const teams = getMatchName(matchNode);
    if (!teams) return null;

    const time = get12HoursTime(matchNode);

    const channels = getChannels(matchNode) || [];

    return {
      competition,
      teams,
      time,
      channels,
    };
  }

  // Helper Functions
  function formatCompetitionName(competitionName) {
    const [name, stage] = competitionName.split(' - ');
    return { name, stage };
  }

  function getMatchName(matchNode) {
    const fullText = matchNode.querySelector('.fLeft').textContent;
    if (!fullText.includes(' v ') || fullText.includes('Israel')) return null;

    const [homeTeam, awayTeam] = fullText.split(' v ');
    return { fullText, homeTeam, awayTeam };
  }

  function get12HoursTime(matchNode) {
    const originalTime = matchNode.querySelector('.fLeft_time_live').innerText;

    const fullTime = originalTime.split(' ')[1];
    const originalHours = Number(fullTime.split(':')[0]) + 1; // The plus 1 is a workaround to support day time saving, Remove it later and do it via a .env variable

    const formattedHours =
      originalHours > 12
        ? (originalHours - 12).toString().padStart(2, '0')
        : originalHours;
    const minutes = fullTime.split(':')[1].padStart(2, '0');
    const postfix = originalHours < 12 ? 'AM' : 'PM';
    const rawTime = `${formattedHours}:${minutes}`;
    const full12HoursTime = `${rawTime} ${postfix}`;
    return { full: full12HoursTime, raw: rawTime, postfix };
  }

  function getChannels(matchNode) {
    const allChannels = matchNode
      .querySelector('.fLeft_live')
      .querySelectorAll('.chan_live_free, .chan_live_not_free');

    const mena = getMenaChannels(allChannels);
    const { free, encrypted } = getOtherChannels(allChannels);

    sortChannelsNames(free);
    sortChannelsNames(encrypted);
    return { mena, free, encrypted };
  }

  function getMenaChannels(channelsList) {
    const menaChannels = [];

    channelsList.forEach((item) => {
      let name = item.textContent.trim().replace(' 📺', '');

      if (!isMenaChannel(name)) return;

      name = name.replace('beIN Sports MENA ', '');
      const { is4K, isHD } = getChannelQuality(name);
      const isFree = isFreeChannel(item);
      const mainInfo = { name, isFree, is4K, isHD };

      const onMouseOverText = item.getAttribute('onmouseover');
      const satInfo = onMouseOverText ? getChannelMeta(onMouseOverText) : null;

      const channel = { mainInfo, satInfo };

      // Only add the channel if satInfo is not empty
      if (channel.satInfo?.length) menaChannels.push(channel);
    });

    sortChannelsNames(menaChannels);
    return menaChannels;
  }

  function getOtherChannels(channelsList) {
    const free = [];
    const encrypted = [];

    channelsList.forEach((item) => {
      let name = item.textContent.trim().replace(' 📺', '');

      // Don't add channels that streams on mobile apps
      if (isOnlineChannel(name) || isMenaChannel(name)) return;

      const isFree = isFreeChannel(item);
      const { is4K, isHD } = getChannelQuality(name);
      const mainInfo = { name, isFree, is4K, isHD };

      const onMouseOverText = item.getAttribute('onmouseover');
      const satInfo = onMouseOverText ? getChannelMeta(onMouseOverText) : null;

      const channel = { mainInfo, satInfo };

      // Only add the channel if satInfo is not empty
      // (This means that the channel is not covered in MENA region. See getChannelMeta and isSatInMENA for more)
      // (NOTE): For the provided sample page, there's no text in 'onmouseover' attribute
      //         which results in no satInfo, hence no channels will be added even if they are at MENA coverage!
      if (channel.satInfo?.length)
        isFree ? free.push(channel) : encrypted.push(channel);
    });

    return { free, encrypted };
  }

  function getChannelQuality(channelName) {
    let isHD = false;
    let is4K = false;

    if (channelName.includes('4K')) {
      is4K = true;
      isHD = true;
    } else if (channelName.includes('HD')) {
      isHD = true;
    }

    return { is4K, isHD };
  }

  function isMenaChannel(channelName) {
    const menaChannels = [
      'beIN Sports MENA',
      'Al Kass',
      'AD Sports',
      'Dubai Sports',
      'Al Aoula Morocco',
      'Arryadia TNT',
    ];

    const isMenaChannel = menaChannels.find((menaChannelName) =>
      channelName.includes(menaChannelName)
    );

    return isMenaChannel !== undefined ? true : false;
  }

  function isOnlineChannel(channelName) {
    return channelName.includes('[app]') ? true : false;
  }

  function isFreeChannel(channel) {
    return channel.classList.contains('chan_live_free') ? true : false;
  }

  function sortChannelsNames(menaChannels) {
    // Sorting Priority:
    // 1- Free
    // 2- 4K
    // 3- HD
    // 4- Bein (Global, Premium , Max then other channels)
    // 5- Al Kass
    // 6- Other Channels By Name
    const compareFunction = (a, b) => {
      const freeA = a.mainInfo.isFree;
      const freeB = b.mainInfo.isFree;
      const fourKA = a.mainInfo.is4K;
      const fourKB = b.mainInfo.is4K;
      const hdA = a.mainInfo.isHD;
      const hdB = b.mainInfo.isHD;
      const globalA = a.mainInfo.name.startsWith('Global');
      const globalB = b.mainInfo.name.startsWith('Global');
      const premiumA = a.mainInfo.name.startsWith('Premium');
      const premiumB = b.mainInfo.name.startsWith('Premium');
      const maxA = a.mainInfo.name.startsWith('Max');
      const maxB = b.mainInfo.name.startsWith('Max');
      const alkassA = b.mainInfo.name.startsWith('Al Kass');
      const alkassB = b.mainInfo.name.startsWith('Al Kass');

      if (freeA !== freeB) return freeA ? -1 : 1;
      if (fourKA !== fourKB) return fourKA ? -1 : 1;
      if (hdA !== hdB) return hdA ? -1 : 1;
      else if (globalA !== globalB) return globalA ? -1 : 1;
      else if (premiumA !== premiumB) return premiumA ? -1 : 1;
      else if (maxA !== maxB) return maxA ? -1 : 1;
      else if (alkassA !== alkassB) return alkassA ? -1 : 1;
      else return a.mainInfo.name.localeCompare(b.mainInfo.name);
    };

    menaChannels.sort(compareFunction);
  }

  function getChannelMeta(metaText) {
    let sourceSample = metaText;
    const satPositionSelector = 'class="pos_col"';
    const satNameSelector = 'class=rest_col';
    const channelFrequencySelector = 'class="freq_col"';
    const channelSymbolSelector = 'class=rest_col';
    const channelEncryptionNotLiveSelector = 'class=enc_not_live';
    const channelEncryptionLiveSelector = 'class=enc_live';

    const meta = [];

    while (sourceSample.indexOf(satPositionSelector) !== -1) {
      // Sat Position
      const { value: tempSatPosition, newSample: satPositionSample } =
        getVariableValue(satPositionSelector, sourceSample);
      const satPosition = formatSatPosition(tempSatPosition);

      // Sat Name
      const { value: satName, newSample: satNameSample } = getVariableValue(
        satNameSelector,
        satPositionSample
      );

      // Channel Frequency
      const { value: tempFrequency, newSample: channelFrequencySample } =
        getVariableValue(channelFrequencySelector, satNameSample);
      const frequency = formatFrequency(tempFrequency);

      // Channel Symbol
      const { value: symbol, newSample: channelSymbolSample } =
        getVariableValue(channelSymbolSelector, channelFrequencySample);

      // Channel Encryption
      let encryption;
      if (channelSymbolSample.includes(channelEncryptionNotLiveSelector)) {
        const { value: tempEncryption, newSample: channelEncryptionSample } =
          getVariableValue(
            channelEncryptionNotLiveSelector,
            channelSymbolSample
          );
        encryption = formatEncryption(tempEncryption);
        sourceSample = channelEncryptionSample;
      } else if (channelSymbolSample.includes(channelEncryptionLiveSelector)) {
        const { value: tempEncryption, newSample: channelEncryptionSample } =
          getVariableValue(channelEncryptionLiveSelector, channelSymbolSample);
        encryption = formatEncryption(tempEncryption);
        sourceSample = channelEncryptionSample;
      }

      const result = {
        satName,
        satPosition,
        frequency,
        symbol,
        encryption,
      };
      if (isSatInMENA(result)) meta.push(result);
    }

    sortChannelMeta(meta);
    return meta;
  }

  function sortChannelMeta(channelMeta) {
    const compareFunction = (a, b) => {
      const satValueA = a.satPosition.value;
      const satValueB = b.satPosition.value;
      const satDirectionA = a.satPosition.direction;
      const satDirectionB = b.satPosition.direction;

      // W direction first, then E direction.
      if (satDirectionA !== satDirectionB)
        return satDirectionA > satDirectionB ? -1 : 1;
      // Sat Values in ascending order
      else if (satValueA !== satValueB) return satValueA > satValueB ? 1 : -1;
      else return 0;
    };

    channelMeta.sort(compareFunction);
  }

  function getVariableValue(variableSelector, sample) {
    const newSample = sample.substring(
      sample.indexOf(variableSelector) + variableSelector.length + 1
    );
    const closingTagIndex = newSample.indexOf('</td>');
    const value = newSample.substring(0, closingTagIndex);
    return { value, newSample };
  }

  function formatSatPosition(satPosition) {
    const resultArray = satPosition.split('°');
    const [value, direction] = resultArray;
    return { value, direction: direction.toUpperCase() };
  }

  function formatFrequency(frequency) {
    return frequency.replace('.', '');
  }

  function formatEncryption(encryption) {
    return encryption
      .replace('HD', '')
      .replace('(', '')
      .replace(')', '')
      .trim();
  }

  function isSatInMENA(satInfo) {
    // Satellite: Support only satellites in range from 35W to 75E
    if (
      (satInfo.satPosition.direction === 'W' &&
        Number(satInfo.satPosition.value) > 35) ||
      (satInfo.satPosition.direction === 'E' &&
        Number(satInfo.satPosition.value) > 75)
    )
      return false;

    // Frequency: Support only frequencies with polarization of H or V
    if (!(satInfo.frequency.includes('H') || satInfo.frequency.includes('V')))
      return false;

    return true;
  }
}
