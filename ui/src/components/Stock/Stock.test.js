import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, List } from 'immutable';
import Stock from './Stock';

const setup = () => {
  const props = {
    isFetching: false,
    hasFetchFailed: false,
    ids: List([ 1, 2 ]),
    byId: fromJS({
      1: {
        id: 1,
        NASDAQ: '11.11',
        CAC40: '11.11',
        timestamp: 123456789
      },
      2: {
        id: 2,
        NASDAQ: '22.22',
        CAC40: '22.22',
        timestamp: 123456789
      }
    }),
    fetchStocks: jest.fn(),
    setStock: jest.fn()
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

  describe('componentWillReceiveProps()', () => {
    it('should set the local state with the new props', () => {
      const { props, wrapper } = setup();
      const nextProps = {
        byId: props.byId.setIn(['1', 'CAC40'], '33.33')
      };

      wrapper.setProps(nextProps);

      expect(wrapper.instance().props.byId).toEqual(nextProps.byId);
    });
  });

  describe('handleInputChange()', () => {
    it('should do nothing if the input value is not a number', () => {
      const { props, wrapper } = setup();
      wrapper.setProps(props);
      
      wrapper.instance().handleInputChange(1, 'CAC40', { target: { value: 'notanumber' } });

      expect(wrapper.instance().state.byId).toEqual(wrapper.instance().props.byId);
    });

    it('should update the local state if the input value is a number', () => {
      const { props, wrapper } = setup();
      wrapper.setProps(props);
      const expectedValue = '40.40';

      wrapper.instance().handleInputChange(1, 'CAC40', { target: { value: expectedValue } });

      expect(wrapper.instance().state.byId.getIn(['1', 'CAC40'])).toBe(expectedValue);
    });
  });

  describe('handleInputKeyUp()', () => {
    it('should do nothing if the pressed key is not Enter', () => {
      const { wrapper } = setup();
      const e = {
        which: 14,
        target: {
          blur: jest.fn()
        }
      };

      wrapper.instance().handleInputKeyUp(e);

      expect(e.target.blur.mock.calls.length).toBe(0);
    });

    it('should blur the input if the pressed key is Enter', () => {
      const { wrapper } = setup();
      const e = {
        which: 13,
        target: {
          blur: jest.fn()
        }
      };

      wrapper.instance().handleInputKeyUp(e);

      expect(e.target.blur.mock.calls.length).toBe(1);
    });
  });

  describe('handleInputBlur()', () => {
    it('should do nothing if the local and redux states of the blurred input are in sync', () => {
      const { props, wrapper } = setup();
      wrapper.setProps(props);
      
      wrapper.instance().handleInputBlur(1, 'CAC40');

      expect(props.setStock.mock.calls.length).toBe(0);
    });

    it('should dispatch a SET_STOCK action to update the redux state if the local and redux states of the blurred input are different', () => {
      const { props, wrapper } = setup();
      wrapper.setProps(props);
      wrapper.instance().state.byId = wrapper.instance().state.byId.setIn(['1', 'CAC40'], '99.99');

      wrapper.instance().handleInputBlur(1, 'CAC40');

      expect(props.setStock.mock.calls.length).toBe(1);
    });
  });
});