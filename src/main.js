// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import {
  // Alert,
  // Aside,
  // Autocomplete,
  // Badge,
  // Breadcrumb,
  // BreadcrumbItem,
  // ButtonGroup,
  // Card,
  // Carousel,
  // CarouselItem,
  // Cascader,
  CheckboxButton,
  // Col,
  // Collapse,
  // CollapseItem,
  // ColorPicker,
  // Container,
  // DatePicker,
  // Dialog,
  // Dropdown,
  // DropdownItem,
  // DropdownMenu,
  // Footer,
  // Form,
  // FormItem,
  // Header,
  // Icon,
  Input,
  // Loading,
  // Main,
  // Menu,
  // MenuItem,
  // MenuItemGroup,
  // Message,
  // MessageBox,
  // Notification
  // Option,
  // OptionGroup,
  // Pagination,
  // Popover,
  // Progress,
  // Radio,
  // Rate,
  // Row,
  // Select,
  // Step,
  // Steps,
  // Submenu,
  Table,
  TableColumn,
  // TabPane,
  // Tabs,
  // Tag,
  // TimePicker,
  // TimeSelect,
  // Tooltip,
  // Transfer,
  // Tree,
  // Upload,
  Button,
  Checkbox,
  CheckboxGroup,
  InputNumber,
  RadioButton,
  RadioGroup,
  // Slider,
  Switch
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css";
import "@/styles/main.scss";
import App from "./App";
import router from "./router";

Vue.prototype.$ELEMENT = { size: "small" };
Vue.config.productionTip = false;

// Vue.use(Alert);
// Vue.use(Aside);
// Vue.use(Autocomplete);
// Vue.use(Badge);
// Vue.use(Breadcrumb);
// Vue.use(BreadcrumbItem);
// Vue.use(ButtonGroup);
// Vue.use(Card);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
// Vue.use(Cascader);
Vue.use(CheckboxButton);
// Vue.use(Col);
// Vue.use(Collapse);
// Vue.use(CollapseItem);
// Vue.use(ColorPicker);
// Vue.use(Container);
// Vue.use(DatePicker);
// Vue.use(Dialog);
// Vue.use(Dropdown);
// Vue.use(DropdownItem);
// Vue.use(DropdownMenu);
// Vue.use(Footer);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Header);
// Vue.use(Icon);
Vue.use(Input);
// Vue.use(Main);
// Vue.use(Menu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
// Vue.use(Option);
// Vue.use(OptionGroup);
// Vue.use(Pagination);
// Vue.use(Popover);
// Vue.use(Progress);
// Vue.use(Radio);
// Vue.use(Rate);
// Vue.use(Row);
// Vue.use(Select);
// Vue.use(Step);
// Vue.use(Steps);
// Vue.use(Submenu);
Vue.use(Table);
Vue.use(TableColumn);
// Vue.use(TabPane);
// Vue.use(Tabs);
// Vue.use(Tag);
// Vue.use(TimePicker);
// Vue.use(TimeSelect);
// Vue.use(Tooltip);
// Vue.use(Tree);
// Vue.use(Upload);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(InputNumber);
Vue.use(Switch);
Vue.use(RadioButton);
Vue.use(RadioGroup);
// Vue.use(Slider);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
