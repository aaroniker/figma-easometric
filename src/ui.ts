import './scss/ui.scss'

var $ = require('jQuery')

window.onmessage = async (event) => {
    if(event.data.pluginMessage.type == 'setToggle') {
        $('[name="close"]').prop('checked', event.data.pluginMessage.bool)
    }
    if(event.data.pluginMessage.type == 'setActive') {
        if(event.data.pluginMessage.active) {
            $('[data-direction="' + event.data.pluginMessage.active + '"]').addClass('active')
        }
    }
}

$('[data-direction]').on('click', e => {

    let link = $(e.currentTarget),
        keep = $('[name="close"]').is(':checked'),
        active = link.data('direction')

    active = link.hasClass('active') ? 'none' : active

    $('[data-direction]').removeClass('active');
    $('[data-direction="' + active + '"]').addClass('active')

    parent.postMessage({
        pluginMessage: {
            type: 'set',
            direction: active
        }
    }, '*')

    return false;

})

$('[data-direction]').hover(function(e) {
    $('[data-direction="' + $(this).data('direction') + '"]').addClass('hover')
}, function(e) {
    $('[data-direction="' + $(this).data('direction') + '"]').removeClass('hover')
})

$('[name="close"]').on('change', e => {
    parent.postMessage({
        pluginMessage: {
            type: 'toggle',
            bool: $('[name="close"]').is(':checked')
        }
    }, '*')
})
