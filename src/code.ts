const {skewDEG, compose} = require('transformation-matrix')

const selection = figma.currentPage.selection

if(selection.length !== 1) {
    figma.closePlugin('Select a single node.')
}

function getOptions(direction) {
    switch(direction) {
        case 'left':
            return {
                skew: -30,
                degree: 90
            }
        break
        case 'right':
            return {
                skew: -30,
                degree: 30
            }
        break
        case 'top':
            return {
                skew: -30,
                degree: -30
            }
        break
        default:
            return {
                skew: 0,
                degree: 0
            }
        break
    }
}

function setIsomentric(node, direction) {

    let options = getOptions(direction),
        matrix = compose(
            skewDEG(0, options.skew)
        ),
        x = node.x,
        y = node.y

    node.relativeTransform = [
        [matrix.a, matrix.b, matrix.e],
        [matrix.c, matrix.d, matrix.f]
    ]
    node.rotation = options.degree

    node.x = x
    node.y = y

    return node

}

function setActive(selection) {
    if(selection.relativeTransform && selection.rotation) {
        switch(~~selection.rotation) {
            case 90:
                return 'left'
            break
            case -30:
                return 'top'
            break
            case 30:
                return 'right'
            break
            default:
                return false
            break
        }
    }
    return false
}

if(figma.command == 'modal') {

    figma.showUI(__html__, {
        width: 320,
        height: 320
    })

    figma.ui.postMessage({
        type: 'setActive',
        active: setActive(selection[0])
    })

    figma.clientStorage.getAsync('easometricClose').then(bool => {
        bool = bool === undefined ? true : bool
        figma.ui.postMessage({
            type: 'setToggle',
            bool: bool
        })
    })

    figma.ui.onmessage = response => {

        if(response.type == 'set') {
            figma.clientStorage.getAsync('easometricClose').then(bool => {
                setIsomentric(selection[0], response.direction)
                figma.notify('Isometric set.')
                if(bool) {
                    figma.closePlugin()
                }
            })
        }

        if(response.type == 'toggle') {
            figma.clientStorage.setAsync('easometricClose', response.bool).then(() => {
                figma.notify(response.bool ? 'Modal will close after selection.' : 'Modal will stay after selection.')
            })
        }

    }

} else {

    setIsomentric(selection[0], figma.command)
    figma.closePlugin('Isometric set.')

}
