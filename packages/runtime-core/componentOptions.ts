import { reactive } from "../reactivity";
import { type ComponentInternalInstance } from "./component";
import { type VNode } from "./vnode";

export type ComponentOptions = {
  data?: () => Record<string, unknown>;
  methods?: { [key: string]: Function };
  computed?: { [key: string]: Function };
  render?: () => VNode;
};

export function applyOptions(instance: ComponentInternalInstance) {
  const options = instance.type;
  const publicThis = instance.proxy! as any;
  const ctx = instance.ctx;

  const {
    data: dataOptions,
    methods,
    computed: computedOptions,
    render,
  } = options;

  if (dataOptions) {
    const data = dataOptions.call(publicThis);
    instance.data = reactive(data);
  }

  if (computedOptions) {
    // TODO
  }

  if (methods) {
    Object.keys(methods).forEach((key) => {
      ctx[key] = methods[key].bind(publicThis);
    });
  }

  if (render) {
    instance.render = render;
  }
}
