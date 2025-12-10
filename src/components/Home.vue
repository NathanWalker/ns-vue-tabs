<script lang="ts" setup>
import { customizeTabs } from "./tab-customize";

const items = [];
for (let i = 0; i < 100; i++) {
  items.push({
    title: `Item ${i + 1}`,
  });
}
</script>

<template>
  <Frame>
    <Page statusBarStyle="light" class="bg-black">
      <TabView
        iosTabBarMinimizeBehavior="onScrollDown"
        tabTextFontSize="11"
        selectedTabTextColor="#fff"
        @loaded="customizeTabs"
        class="bg-black"
      >
        <TabViewItem title="Home" iconSource="sys://house.fill">
          <ListView
            :items="items"
            separatorColor="transparent"
            class="bg-black"
          >
            <template #default="{ item }">
              <GridLayout class="p-4 m-2 bg-white/20 rounded-lg h-12">
              </GridLayout>
            </template>
          </ListView>
        </TabViewItem>
        <TabViewItem title="Saved" iconSource="sys://star.fill">
          <Label
            text="Second Tab Content"
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
