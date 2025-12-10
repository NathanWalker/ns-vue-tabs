import {
  EventData,
  Label,
  TabView,
  View,
  Color,
  GridLayout,
  Image,
} from "@nativescript/core";
import { Shimmer, ShimmerDirection } from "@nstudio/nativescript-shimmer";

let isAccessoryAttached = false;
// nice subtle shimmer effect
Shimmer.defaults = {
  speed: 2.6,
  direction: ShimmerDirection.leftToRight,
  repeat: Number.MAX_VALUE,
  lightColor: "rgba(0,0,0,.5)",
  darkColor: "rgba(255,255,255,1)",
};

export function customizeTabs(args: EventData) {
  if (__APPLE__) {
    const tabView = args.object as TabView;
    attachBottomAccessory(tabView);
  }
}

function attachBottomAccessory(tabView: TabView) {
  if (isAccessoryAttached) return;
  if (!tabView) return;

  /**
   * Use NativeScript to make accessory!
   * Comment this code and uncomment below to try with Swift if you want too.
   */
  useNativeScriptAccessory(tabView);

  /**
   * Use Swift if you want!
   */
  //   useSwiftAccessory(tabView);

  // accessory now attached
  isAccessoryAttached = true;
}

function useNativeScriptAccessory(tabView: TabView) {
  const root = new GridLayout();
  root.rows = "auto,auto";
  root.columns = "auto,*,auto,auto";
  root.iosOverflowSafeArea = false;
  root.padding = 12;
  root.width = { unit: "%", value: 100 };
  root.height = 56; // ensure visible height

  const image = new Image();
  image.src = "~/assets/icon3.png";
  image.backgroundColor = new Color("#fff");
  image.rowSpan = 2;
  image.col = 0;
  image.width = 24;
  image.height = 24;
  image.marginLeft = 4;
  image.verticalAlignment = "middle";
  image.horizontalAlignment = "center";
  image.borderRadius = 4;
  root.addChild(image);

  const grid = new GridLayout();
  grid.row = 0;
  grid.col = 1;
  const label = new Label();
  label.text = "Designing Liquid Glass...";
  label.color = new Color("#fff");
  label.fontSize = 12;
  label.textAlignment = "left";
  label.marginLeft = 8;
  grid.on("loaded", startShimmer);
  grid.addChild(label);
  root.addChild(grid);

  const label2 = new Label();
  label2.row = 1;
  label2.col = 1;
  label2.text = "NativeScript is pretty cool";
  label2.color = new Color("#888");
  label2.fontSize = 9;
  label2.textAlignment = "left";
  label2.marginLeft = 8;
  root.addChild(label2);
  tabView.iosBottomAccessory = root;
}

function useSwiftAccessory(tabView: TabView) {
  const accessory = new TabsAccessory();
  tabView.iosBottomAccessory = accessory;
}

function startShimmer(args: EventData) {
  const label = args.object as Label;
  Shimmer.start(label);
}

// from App_Resources/ios/src/Tabs.swift
declare const TabsAccessoryView: any;

class TabsAccessory extends View {
  createNativeView() {
    return TabsAccessoryView.new();
  }
}
