import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import * as FlexWebChat from "@twilio/flex-webchat-ui";

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import CustomerAccountPanel from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'ViribuzmediaConversationFlexUiPlugin';

export default class ViribuzmediaConversationFlexUiPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    const options = { sortOrder: -1 };
    flex.TaskListContainer.Content.add(<CustomTaskListContainer key="ViribuzmediaConversation-CustomTaskListContainer" />, options);
    flex.AgentDesktopView.Panel1.Content.add(<FlexWebChat key="ViribuzmediaConversation-FlexWebChat" />, options);
    flex.AgentDesktopView.Panel2.Content.add(<CustomerAccountPanel key="ViribuzmediaConversation-CustomerAccountPanel" />, options);
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
