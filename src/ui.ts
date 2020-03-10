import './scss/ui.scss'

const $ = require('jQuery')

window.onmessage = async (event) => {
    if(event.data.pluginMessage.type == 'setToggle') {
        $('[name="close"]').prop('checked', event.data.pluginMessage.bool)
    }
    if(event.data.pluginMessage.type == 'setActive') {
        if(event.data.pluginMessage.active) {
            $('[data-direction]').removeClass('active')
            $('[data-direction="' + event.data.pluginMessage.active + '"]').addClass('active')
        }
    }

    if (event.data.pluginMessage.type == 'setAngle' && event.data.pluginMessage.angle) {
        $('#skew-angle').val(event.data.pluginMessage.angle)
    }

    if (event.data.pluginMessage.type == 'setBlocked') {
        event.data.pluginMessage.state ?
            $('#easometric').addClass('blocked') :
            $('#easometric').removeClass('blocked')
    }
}

$('[data-direction]').on('click', e => {

    let link = $(e.currentTarget),
        active = link.data('direction')

    active = link.hasClass('active') ? 'none' : active

    $('[data-direction]').removeClass('active');
    $('[data-direction="' + active + '"]').addClass('active')

    parent.postMessage({
        pluginMessage: {
            type: 'set',
            direction: active,
            angle: parseFloat($('#skew-angle').val())
        }
    }, '*')

    return false
})

$('[data-direction]').hover(function(e) {
    $('[data-direction="' + $(this).data('direction') + '"]').addClass('hover')
    $('#easometric .box .top').addClass('hover-' + $(this).data('direction'))
}, function(e) {
    $('[data-direction="' + $(this).data('direction') + '"]').removeClass('hover')
    $('#easometric .box .top').removeClass('hover-' + $(this).data('direction'))
})

$('[name="close"]').on('change', e => {
    parent.postMessage({
        pluginMessage: {
            type: 'toggle',
            bool: $('[name="close"]').is(':checked')
        }
    }, '*')
})

$('#skew-angle').on('input', function(e) {
    parent.postMessage({
        pluginMessage: {
            type: 'set',
            direction: $('[data-direction].active').data('direction'),
            angle: parseFloat(e.currentTarget.value) || 0
        }
    }, '*')
})
