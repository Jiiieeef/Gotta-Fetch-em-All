import { mount } from '@vue/test-utils';
import GenderBar from '~/components/GenderBar.vue';

describe('GenderBar', () => {
  describe('Genderless', () => {
    const wrapper = mount(GenderBar, {
      propsData: {
        gender: false
      }
    });

    test('should display Genderless when gender is false', () => {
      expect(wrapper.find('.genderless').text()).toEqual('Genderless');
    });
  });
});
