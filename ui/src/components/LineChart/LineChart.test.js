import React from 'react';
import { shallow } from 'enzyme';
import Chart from './LineChart';

const setup = () => {
  const props = {
  };
  
  const wrapper = shallow(<LineChart {...props}/>);

  return {
    props,
    wrapper
  };
};

describe('<LineChart/>', () => {
  describe('render() / componentDidMount()', () => {
    it('should render a <svg/> element', () => {
      const { props, wrapper } = setup();
      
      expect(wrapper.find('svg')).toHaveLength(1);      
    });  
  });  
});  