import React from 'react';
import Game from './Game';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import asyncBootstrapper from 'react-async-bootstrapper';
import { GAMES_MAP } from '../../games';

describe('Game', () => {

  it('should render properly for multiplayer', async () => {
    const app = <Game match={{ params: { gameCode: 'chess', mode: 'online' } }} />;
    await asyncBootstrapper(app);
    const wrapper = mount(app);
    expect(wrapper.html()).to.contain('connecting');
  });

  it('should render properly for singleplayer', async () => {
    const app = <Game match={{ params: { gameCode: 'chess', mode: 'local' } }} />;
    await asyncBootstrapper(app);
    const wrapper = mount(app);
    expect(wrapper.find('Checkerboard').length).to.equal(1);
  });

  it('should render error correctly', async () => {
    GAMES_MAP['chess'].config = () => Promise.reject(new Error('fail'));
    const app = <Game match={{ params: { gameCode: 'chess', mode: 'local' } }} />;
    await asyncBootstrapper(app);
    const wrapper = mount(app);
    expect(wrapper.html()).to.contain('Error');
  });

  it('should render loading correctly', () => {
    const app = <Game match={{ params: { gameCode: 'chess', mode: 'local' } }} />;
    const wrapper = mount(app);
    (wrapper.instance() as any).clear(); 
    (wrapper.instance() as any).forceUpdate();
    expect(wrapper.html()).to.contain('Loading');
  });
});
