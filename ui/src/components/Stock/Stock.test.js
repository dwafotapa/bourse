import React from 'react';
import { shallow } from 'enzyme';
import Stock from './Stock';

const setup = () => {
  const props = {
    isFetching: false,
    hasFetchFailed: false,
    ids: [],
    byId: {},
    fetchStocks: jest.fn()
  };
  
  const wrapper = shallow(<Stock {...props}/>);

  return {
    props,
    wrapper
  };
};

describe('<Stock/>', () => {
  describe('render() / componentDidMount()', () => {
    it('should render <div>Stock</div> and call fetchStocks()', () => {
      const { props, wrapper } = setup();

      expect(wrapper.find('div')).toHaveLength(1);
      expect(props.fetchStocks.mock.calls.length).toBe(1);
    });
  });
});