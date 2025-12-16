import {
  EventData,
  Label,
  TabView,
  View,
  Color,
  GridLayout,
  Image,
  CoreTypes,
  Dialogs,
} from "@nativescript/core";
import { Shimmer, ShimmerDirection } from "@nstudio/nativescript-shimmer";
import { onHmrUpdate } from "@nativescript/vite/hmr/shared/runtime/hooks";

/**
 * CommonJS example explorations
 * 
 */
import chroma from "chroma-js";

const r = chroma("red");
console.log("r:", r.hex());

import base64url from 'base64-url';
const base64Text = base64url.encode('Hello World!');  
console.log("base64url.encode('Hello World!'):", base64Text)
console.log("base64url.decode(base64Text):", base64url.decode(base64Text));

// nice subtle shimmer effect
Shimmer.defaults = {
  speed: 2.6,
  direction: ShimmerDirection.leftToRight,
  repeat: Number.MAX_VALUE,
  lightColor: "rgba(0,0,0,.5)",
  darkColor: "rgba(255,255,255,1)",
};

const hmrHandler = (payload: any) => {
  tabCustomizer.resetAccessory(payload);
};

onHmrUpdate(hmrHandler, "tab-customize");

class TabCustomizer {
  tabView: TabView | null = null;
  shimmerView: GridLayout | null = null;
  ellipsisIcon: Image | null = null;
  titleLabel: Label | null = null;
  isAccessoryAttached = false;
  accessoryIsCompact = false;
  rerenderTimer: NodeJS.Timeout | undefined = undefined;

  customizeTabs(args: EventData) {
    if (__APPLE__) {
      this.tabView = args.object as TabView;
      this.attachBottomAccessory();
    }
  }
  attachBottomAccessory() {
    if (this.isAccessoryAttached) return;
    if (!this.tabView) return;

    /**
     * Use NativeScript to make accessory!
     * Comment this code and uncomment below to try with Swift if you want too.
     */
    this.useNativeScriptAccessory();

    /**
     * Use Swift if you want!
     */
    //   useSwiftAccessory(tabView);

    // accessory now attached
    this.isAccessoryAttached = true;
  }

  useNativeScriptAccessory() {
    const root = new GridLayout();
    root.rows = "auto,auto";
    root.columns = "auto,*,auto,auto";
    root.iosOverflowSafeArea = false;
    root.padding = 12;
    root.width = { unit: "%", value: 100 };
    root.height = 56; // ensure visible height

    const image = new Image();
    image.src = "~/assets/icon3.png";
    image.backgroundColor = new Color("white");
    image.rowSpan = 2;
    image.col = 0;
    image.width = 24;
    image.height = 24;
    image.marginLeft = 4;
    image.verticalAlignment = "middle";
    image.horizontalAlignment = "center";
    image.borderRadius = 4;
    root.addChild(image);

    this.shimmerView = new GridLayout();
    this.shimmerView.row = 0;
    this.shimmerView.col = 1;
    this.titleLabel = new Label();
    this.titleLabel.text = "Designing Liquid Glass accessory...";
    this.titleLabel.color = new Color("#fff");
    this.titleLabel.fontSize = 12;
    this.titleLabel.textAlignment = "left";
    this.titleLabel.marginLeft = 8;
    this.shimmerView.on("loaded", this.startShimmer);
    this.shimmerView.addChild(this.titleLabel);
    root.addChild(this.shimmerView);

    const label2 = new Label();
    label2.row = 1;
    label2.col = 1;
    label2.text = "NativeScript is pretty cool";
    label2.color = new Color("gray");
    label2.fontSize = 9;
    label2.textAlignment = "left";
    label2.marginLeft = 8;
    root.addChild(label2);
    this.tabView!.iosBottomAccessory = root;
  }
  scrollChange(args: any) {
    const scrollY = args.value as number;
    if (!this.accessoryIsCompact && scrollY > 50) {
      this.accessoryIsCompact = true;
      this.rerenderAccessory(0);
    } else if (this.accessoryIsCompact && scrollY <= 0) {
      this.accessoryIsCompact = false;
      this.rerenderAccessory();
    }
  }
  rerenderAccessory(timeout = 150) {
    const contentView = (this.tabView!.ios as UITabBarController)
      .bottomAccessory?.contentView;
    if (!contentView) return;
    setTimeout(() => {
      UIView.animateWithDurationAnimations(0.25, () => {
        contentView.setNeedsDisplay();
        contentView.setNeedsLayout();
        contentView.layoutIfNeeded();
      });
    }, timeout);
  }
  resetAccessory(payload?: any) {
    if (!this.tabView) return;
    if (this.isAccessoryAttached) {
      this.isAccessoryAttached = false;
    }
    // Note: could isolate this to only when this file changes if wanted
    // if (!payload.changedIds.some((id) => id.includes("tab-customize"))) return;
    Shimmer.stop(this.shimmerView!);
    // @ts-ignore
    this.tabView.iosBottomAccessory = null;
    if (typeof this.rerenderTimer !== "undefined") {
      clearTimeout(this.rerenderTimer);
    }
    this.rerenderTimer = setTimeout(() => {
      this.attachBottomAccessory();
    }, 300);
  }
  startShimmer(args: EventData) {
    const view = args.object as GridLayout;
    Shimmer.start(view);
  }
}

// Keep a stable singleton for runtime references, but make it HMR-updatable by
// swapping its prototype on module re-evaluation.
const existing = (global as any).tabCustomizer as TabCustomizer | undefined;
if (existing) {
  try {
    Object.setPrototypeOf(existing as any, TabCustomizer.prototype);
  } catch {}
} else {
  (global as any).tabCustomizer = new TabCustomizer();
}
export const tabCustomizer = (global as any).tabCustomizer as TabCustomizer;

function useSwiftAccessory(tabView: TabView) {
  const accessory = new TabsAccessory();
  tabView.iosBottomAccessory = accessory;
}

// from App_Resources/ios/src/Tabs.swift
declare const TabsAccessoryView: any;

class TabsAccessory extends View {
  createNativeView() {
    return TabsAccessoryView.new();
  }
}
