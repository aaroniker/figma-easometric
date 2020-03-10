const {skewDEG, rotateDEG, compose} = require('transformation-matrix')

const defaultAngle = 30

function getOptions(direction, angle) {
    switch(direction) {
        case 'left':
            return {
                rotate: 0,
                skew: angle,
                degree: -angle
            }
        case 'right':
            return {
                rotate: 0,
                skew: -angle,
                degree: angle
            }
        case 'top-left':
            return {
                rotate: 0,
                skew: 2 * angle - 90,
                degree: -angle
            }
        case 'top-right':
            return {
                rotate: 90,
                skew: 2 * angle - 90,
                degree: angle
            }
        default:
            return {
                rotate: 0,
                skew: 0,
                degree: 0
            }
    }
}

function setIsometric(node, direction, angle) {

    let options = getOptions(direction, angle),
        matrix = compose(
            rotateDEG(options.rotate),
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

    node.setPluginData('direction', direction)
    node.setPluginData('angle', angle.toString())

    return node

}

function setActive(selection) {
    if(selection.length === 1) {
        let active = selection[0].getPluginData('direction') || false,
            angle = parseFloat(selection[0].getPluginData('angle')) || defaultAngle

        figma.ui.postMessage({ type: 'setBlocked', state: false })
        figma.ui.postMessage({ type: 'setActive', active })
        figma.ui.postMessage({ type: 'setAngle', angle })
    } else {
        figma.ui.postMessage({ type: 'setBlocked', state: true })
    }
}

if(figma.command == 'modal') {

    figma.showUI(__html__, {
        width: 320,
        height: 374
    })

    setActive(figma.currentPage.selection)

    figma.on('selectionchange', () => {
        setActive(figma.currentPage.selection)
    })

    figma.clientStorage.getAsync('easometricClose').then(bool => {
        bool = bool === undefined ? true : bool
        figma.ui.postMessage({
            type: 'setToggle',
            bool: bool
        })
    })

    figma.ui.onmessage = response => {
        let selection = figma.currentPage.selection;

        if(response.type === 'set' && selection.length === 1) {
            setIsometric(selection[0], response.direction, response.angle)

            figma.clientStorage.getAsync('easometricClose').then(bool => {
                bool = bool === undefined ? true : bool
                bool && figma.closePlugin('Isometric set.')
            })
        }

        if(response.type === 'toggle') {
            figma.clientStorage.setAsync('easometricClose', response.bool).then(() => {
                figma.notify(response.bool ? 'Modal will close after selection.' : 'Modal will stay after selection.')
            })
        }

    }

} else {
    let selection = figma.currentPage.selection

    if (selection.length === 1) {
        setIsometric(selection[0], figma.command, defaultAngle)
        figma.closePlugin('Isometric set.')
    } else {
        figma.closePlugin('Select a single node.')
    }

}
