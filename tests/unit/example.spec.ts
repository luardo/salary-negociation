import Vue from 'vue'
import {mount, shallowMount} from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import SimpleForm from "@/components/SimpleForm.vue";

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: {msg}
    })
    expect(wrapper.text()).toMatch(msg)
  })
})


describe('Form.vue', () => {
  it('renders title when passed', () => {
    const title = 'new message'
    const wrapper = shallowMount(SimpleForm, {
      propsData: {title}
    })
    expect(wrapper.text()).toMatch(title)
  })

  it('has a submit button', async () => {
    const wrapper = shallowMount(SimpleForm)
    const button = wrapper.find('.simple-form__button');
    expect(button.text()).toBe('Submit')
    expect(button).toBeTruthy()
  })

  it('emits amount value on form submit', async () => {
    const wrapper = mount(SimpleForm, {
      data: () => {
        return {
          amount: 60000
        }
      },
    })
    const form = wrapper.find('.simple-form');
    await form.trigger('submit');
    expect(wrapper.emitted().amountSelected[0][0]).toBe(60000)
  })

  it('calls method when form submit', async () => {
    const onSubmit = jest.fn()
    const wrapper = shallowMount(SimpleForm, {
      methods: {
        onSubmit
      }
    })

    const form = wrapper.find('.simple-form');
    await form.trigger('submit');
    expect(onSubmit).toHaveBeenCalled()
  })
})
