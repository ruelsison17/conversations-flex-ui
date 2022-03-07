import { FlexPlugin } from '@twilio/flex-plugin';
import * as FlexWebChat from "@twilio/flex-webchat-ui";

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';

import { setUpActions, setUpComponents, setUpNotifications } from './helpers';

const options = { sortOrder: -1 };

const PLUGIN_NAME = 'ConversationsPlugin';

export default class ConversationsPlugin extends FlexPlugin {
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

    //Flex.CRMContainer
    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      return task 
        ? `https://bing.com/?q=${task.attributes.name}`
        : 'https://bing.com';
    }
    
    //flex.AgentDesktopView.defaultProps.showPanel2 = false;
    //flex.TaskInfoPanel.Content.add(<CustomTaskListContainer key="ViribuzmediaConversation-CustomTaskListContainer" />, options);
    //flex.AgentDesktopView.Panel1.Content.add(<FlexWebChat key="ViribuzmediaConversation-FlexWebChat" />, options);
    //flex.AgentDesktopView.Panel1.Content.remove();
    setUpComponents();
    setUpNotifications();
    setUpActions();
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
