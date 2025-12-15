<script lang="ts" setup>
import { EventData, type TabView } from "@nativescript/core";
import { tabCustomizer } from "./tab-customize";

const items = [];
for (let i = 0; i < 100; i++) {
  items.push({
    title: `Item ${i + 1}`,
  });
}
function customize(args: EventData) {
  tabCustomizer.customizeTabs(args);
}
function scrollChange(args: EventData) {
  tabCustomizer.scrollChange(args);
}
function tapHome() {
  // Reset accessory on tap
  tabCustomizer.scrollChange({ value: 0 } as any);
}
</script>

<template>
  <Frame>
    <Page statusBarStyle="light" class="bg-black">
      <TabView
        iosTabBarMinimizeBehavior="onScrollDown"
        tabTextFontSize="11"
        selectedTabTextColor="#fff"
        @loaded="customize"
        @tap="tapHome"
        class="bg-black"
      >
        <TabViewItem title="Home" iconSource="sys://house.fill" >
          <ListView
            :items="items"
            separatorColor="transparent"
            class="bg-black"
            @scrollChange="scrollChange"
          >
            <template #default="{ item }">
              <GridLayout class="p-4 m-2 bg-white/20 rounded-lg h-12">
              </GridLayout>
            </template>
          </ListView>
        </TabViewItem>
        <TabViewItem title="Saved" iconSource="sys://star.fill">
          <Label
            text="Second Tab check"
            class="text-center text-white"
          ></Label>
        </TabViewItem>
        <TabViewItem title="Settings" iconSource="sys://gearshape.fill">
          <Label
            text="Third Tab Content"
            class="text-center text-white"
          ></Label>
        </TabViewItem>
        <TabViewItem iconSource="res://ns-logo" role="search">
          <GridLayout class="bg-black">
            <Label text="Search Tab" class="text-center text-white"></Label>
          </GridLayout>
        </TabViewItem>
      </TabView>
    </Page>
  </Frame>
</template>
