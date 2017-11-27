import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import Stock from './Stock';

const setup = () => {
  const props = {
    isFetching: false,
    hasFetchFailed: false,
    ids: [ 1, 2 ],
    byId: {
      1: {
        timestamp: 123456789,
        id: 1,
        byMarket: {
          CAC40: 11.11,
          NASDAQ: 11.11
        }
      },
      2: {
        timestamp: 123456789,
        id: 2,
        byMarket: {
          CAC40: 22.22,
          NASDAQ: 22.22
        }
      }
    },
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
        ...props,
        ids: [ 1, 2 ],
        byId: {
          1: {
            timestamp: 234567890,
            id: 1,
            byMarket: {
              CAC40: 33.33,
              NASDAQ: 33.33
            }
          },
          2: {
            timestamp: 234567890,
            id: 2,
            byMarket: {
              CAC40: 44.44,
              NASDAQ: 44.44
            }
          }
        }
      };

      wrapper.setProps(nextProps);

      expect(wrapper.instance().props).toEqual(nextProps);
    });
  });

  describe('handleInputChange()', () => {
    it('should do nothing if the input value is not a number', () => {
      const { props, wrapper } = setup();
      
      wrapper.instance().handleInputChange(1, 'CAC40', { target: { value: 'notanumber' } });

      expect(wrapper.instance().state.byId.getIn(['1', 'byMarket', 'CAC40'])).toBe(props.byId[1].byMarket['CAC40']);
    });

    it('should update the local state if the input value is a number', () => {
      const { props, wrapper } = setup();

      wrapper.instance().handleInputChange(1, 'CAC40', { target: { value: '40.40' } });

      expect(wrapper.instance().state.byId.getIn(['1', 'byMarket', 'CAC40'])).toBe(40.40);
    });
  });

  describe('handleInputKeyUp()', () => {
    it('should blur the input if the Enter key is pressed', () => {
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
      wrapper.instance().state.byId = fromJS(props.byId);      

      expect(wrapper.instance().state.byId.getIn(['1', 'byMarket', 'CAC40'])).toBe(props.byId[1].byMarket['CAC40']);
      
      wrapper.instance().handleInputBlur(1, 'CAC40');

      expect(wrapper.instance().state.byId.getIn(['1', 'byMarket', 'CAC40'])).toBe(props.byId[1].byMarket['CAC40']);
    });

    it('should dispatch a SET_STOCK action to update the redux state if the local and redux states of the blurred input are different', () => {
      const { props, wrapper } = setup();
      wrapper.instance().state.byId = fromJS({
        1: {
          timestamp: 123456789,
          id: 1,
          byMarket: {
            CAC40: 99.99,
            NASDAQ: 11.11
          }
        },
        2: {
          timestamp: 123456789,
          id: 2,
          byMarket: {
            CAC40: 22.22,
            NASDAQ: 22.22
          }
        }
      });

      wrapper.instance().handleInputBlur(1, 'CAC40');

      expect(props.setStock.mock.calls.length).toBe(1);
    });
  });
});