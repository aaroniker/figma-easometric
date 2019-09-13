# Figma Easometric

![Preview](https://aaroniker.me/easometric.gif)

With Easometric it's really easy to create isometric layers & groups.

This plugin using SSR30⁰, which is the most popular and flexible method of creating isometric artworks. With SSR30⁰ you can quickly create top, left and right isometric views.

Simple as that you can either quick apply a top, left or right perspective or using the modal to modify your layer.

## Usage

Download it on the Figma plugin library [figma.com/c/plugin/750743440401413268/Easometric](https://www.figma.com/c/plugin/750743440401413268/Easometric)

## Development

First clone this repository
```shell
git clone https://github.com/aaroniker/figma-easometric.git
cd figma-easometric
```

Install dependencies & build files
```shell
npm install
npm run build
# Or watch: npm run dev
```

After that open a project in Figma Desktop, select _Plugins -> Development -> New Plugin_. Click `Choose a manifest.json` and find the `manifest.json` file in this plugin directory.

Done! Now _Plugins -> Development -> Easometric_

## ToDo

- [ ] Add SR45⁰ method
- [ ] Live Preview
- [ ] Node stay at same position after choose an angle

## Authors

- Aaron Iker ([Twitter](https://twitter.com/aaroniker_me))
- Martin David ([Twitter](https://twitter.com/srioz))
