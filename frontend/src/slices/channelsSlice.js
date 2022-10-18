import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannel: {
    id: 1,
    name: 'general',
  },
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    loadChannels: (state, action) => {
      Object.assign(state, { channels: action.payload });
    },
    getCurrentChannel: (state, action) => {
      const currentChannel = state.channels.find((channel) => channel.id === action.payload);
      Object.assign(state.currentChannel, { id: action.payload, name: currentChannel.name });
    },
    addChannel: (state, action) => {
      const newChannel = {
        id: action.payload.id,
        name: action.payload.name,
        removable: true,
      };
      state.channels.push(newChannel);
      Object.assign(state.currentChannel, { id: newChannel.id });
    },
    removeChannel: (state, action) => {
      const newChannels = state.channels.filter((channel) => channel.id !== action.payload);
      Object.assign(state, { channels: newChannels });
      if (state.currentChannel.id === action.payload) {
        Object.assign(state.currentChannel, { id: 1 });
      }
    },
    renameChannel: (state, action) => {
      state.channels.forEach((channel) => {
        if (channel.id === action.payload.id) {
          Object.assign(channel, { name: action.payload.name });
        }
      });
    },
  },
});

const selectAllChannels = (state) => state.channels.channels;
const selectCurrentChannelId = (state) => state.channels.currentChannel.id;
const selectCurrentChannelName = (state) => state.channels.currentChannel.name;

export const { actions } = channelsSlice;
export { selectAllChannels, selectCurrentChannelId, selectCurrentChannelName };

export default channelsSlice.reducer;
