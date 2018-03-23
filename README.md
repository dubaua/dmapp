# dungeon-master-toolbox

> web application that makes dm's life easy

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## TODO

- [ ] перетащить на нюкст

### DragInput

- [x] Сделать рабочий драгинпут
- [ ] Переписать на svg (возможно)
- [ ] сделать подсказки мин, макс
- [ ] Выводить подсказки и текущее значение избежав попадания под палец.
- [ ] some other

### Tracker

- [x] Переработать трекер в таблицу фреймворка
- [ ] Вынести список бойцов (игроков и мобов), стеш, пресеты эффектов в стейт (чтобы открыть доступ к быстрому урону, хилу и щитам через мутации)
- [ ] эффекты у каждого бойца представлены в виде объекта
- [ ] Сделать обработчик атаки: Урон, Лечение, Щиты, эффекты (Конструктор эффектов вызывается в отдельном окне всегда).
- [ ] В обработчике атаки и можно добавлять эффекты из пресетов.
- [ ] Сделать стеш бойцов, там сидят те, кто не на поле, но готов выйти, или трупики. Либо трупы в отдельной пачке.
- [ ] На каждую битву должны быть установлены следующие настройки: игроки, монстры, пресеты эффектов, стеш

### Effect constructor

- [ ] Грубая рабочая версия конструктора.
- [ ] Сделать вызывающий сам себя конструктор эффектов
- [ ] В обработчике попадания можно заполнять эффекты из пресетов.
- [x] Сделать быстрый словарь кондиций (он есть в енумчике)

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
"# dmapp"
