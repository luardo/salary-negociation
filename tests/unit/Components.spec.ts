import {mount, shallowMount} from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import SimpleForm from "@/components/SimpleForm.vue";
import SalaryForm from "@/components/SalaryForm.vue";

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: {msg}
    })
    expect(wrapper.text()).toMatch(msg)
  })
})


describe('SimpleForm.vue', () => {
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

describe('SalaryForm.vue', () => {
  it('showsResult is true when Employer and Candidate salary are given', async () => {
    const wrapper = shallowMount(SalaryForm, {
      data: () => {
        return {
          candidateSalary: 0,
          employerSalary : 0
        }
      }
    })

    // @ts-ignore
    await wrapper.vm.onCandidateSalarySubmitted(100);
    // @ts-ignore
    await wrapper.vm.onEmployerSalarySubmitted(100);

    // @ts-ignore
    expect(wrapper.vm.showResult).toBeTruthy();
  })

  it('resultMessage to be Success given Employer salary is Higher than candidate salary', async () => {
    const wrapper = shallowMount(SalaryForm, {
      data: () => {
        return {
          candidateSalary: 0,
          employerSalary : 0
        }
      }
    });

    // @ts-ignore
    await wrapper.vm.onCandidateSalarySubmitted(100);
    // @ts-ignore
    await wrapper.vm.onEmployerSalarySubmitted(200);

    // @ts-ignore
    expect(wrapper.vm.resultMessage).toBe('Success');
  })

  it('resultMessage to be Failed given Employer salary is Lower than candidate salary', async () => {
    const wrapper = shallowMount(SalaryForm, {
      data: () => {
        return {
          candidateSalary: 0,
          employerSalary : 0
        }
      }
    });

    // @ts-ignore
    await wrapper.vm.onCandidateSalarySubmitted(200);
    // @ts-ignore
    await wrapper.vm.onEmployerSalarySubmitted(120);

    // @ts-ignore
    expect(wrapper.vm.resultMessage).toBe('Failure');
  })

  it('showEmployerForm to be TRUE when app starts', async () => {
    const wrapper = shallowMount(SalaryForm);

    // @ts-ignore
    expect(wrapper.vm.showEmployerForm).toBeTruthy();
  })

  it('showEmployerForm to be FALSE after employer amount is given', async () => {
    const wrapper = shallowMount(SalaryForm);

    // @ts-ignore
    await wrapper.vm.onEmployerSalarySubmitted(120);

    // @ts-ignore
    expect(wrapper.vm.showEmployerForm).toBeFalsy();
  })
})
