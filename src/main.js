(() => {

    toggleMenuVisibility = (toggle) => {
        if (toggle === 'emote') {
            $('#emoteWidgetDisplay').show(1);
            $('#physicsWidgetDisplay').hide(1);
        } else if (toggle === 'physics') {
            $('#emoteWidgetDisplay').hide(1);
            $('#physicsWidgetDisplay').show(1);
        }
    }

    toggleVisibility = (toggle) => {
        if (toggle === 'show') {
            $('#hide-url-builder').show(1);
            $('.emote-widget-url-builder').show(1);
            $('#show-url-builder').hide(1);
        } else if (toggle === 'hide') {
            $('#hide-url-builder').hide(1);
            $('.emote-widget-url-builder').hide(1);
            $('#show-url-builder').show(1);
        }
    };

    generateUrlParams = () => {
        let url = `${window.location.origin}${window.location.pathname}`;
        const paramsToAdd = [];
        const channel = getTextboxValue('channel');
        if (channel !== 'itsatreee') {
            paramsToAdd.push(`channel=${channel}`);
        }
        const showTwitch = getRadioButtonCheckedValue('showTwitch');
        const clientId = getTextboxValue('clientId');
        paramsToAdd.push(`clientId=${clientId}`);
        if (showTwitch !== 'true') {

            paramsToAdd.push(`showTwitch=${showTwitch}`);
        }
        const showGlobal = getRadioButtonCheckedValue('showGlobal');
        if (showGlobal !== 'false') {
            paramsToAdd.push(`showGlobal=${true}`);
        }
        const showBttv = getRadioButtonCheckedValue('showBttv');
        if (showBttv !== 'false') {
            paramsToAdd.push(`showBttv=${true}`);
        }

        const totalEmotes = getNumberInputValues('totalEmotes');
        if (totalEmotes !== '100') {
            paramsToAdd.push(`totalEmotes=${totalEmotes}`);
        }
        const secondsToRain = getNumberInputValues('secondsToRain');
        if (secondsToRain !== '10') {
            paramsToAdd.push(`secondsToRain=${secondsToRain}`);
        }
        const secondsToWaitForRain = getNumberInputValues('secondsToWaitForRain');
        if (secondsToWaitForRain !== '23') {
            paramsToAdd.push(`secondsToWaitForRain=${secondsToWaitForRain}`);
        }
        const numTimesToRepeat = getNumberInputValues('numTimesToRepeat');
        if (numTimesToRepeat !== '1') {
            paramsToAdd.push(`numTimesToRepeat=${numTimesToRepeat}`);
        }
        // const single = getTextboxValue('single');
        // if (single !== '') {
        //    paramsToAdd.push(`single=${single}`);
        // }
        let paramString = '';
        paramsToAdd.forEach((param) => {
            paramString = paramString.concat(`&${param}`);
        });
        if (paramsToAdd.length > 0) {
            url = url.concat('?').concat(paramString.substring(1));
        }
        console.log(url);
        $('#generatedUrl').text(url);
    };

    getRadioButtonCheckedValue = (buttonGroupName) => {
        return $(`input[name="${buttonGroupName}"]:checked`).val();
    }

    getTextboxValue = (id) => {
        return $(`#${id}`).val();
    }

    getNumberInputValues = (name) => {
        return $(`input[name="${name}"]`).val();
    };
})();