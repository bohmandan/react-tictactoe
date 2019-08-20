import React from 'react';
import { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import { shallow, configure } from 'enzyme';

// configure({adapter: new Adapter()});

import { Game } from './Game';

describe('Game', () => { 
  it('renders without crashing', () => {
    shallow(<Game />);
  });

  it('renders start status', () => {
    const wrapper = shallow(<Game />);
    const firstStatus = <div>Next player: X</div>;
    expect(wrapper).toContainReact(firstStatus);
  });
});