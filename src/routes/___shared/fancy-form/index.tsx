import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TimePicker,
} from 'antd';
import type { Rule } from 'antd/es/form';
import type React from 'react';
import { useEffect, useRef } from 'react';

export interface FieldForm {
  type:
    | 'text'
    | 'password'
    | 'tel'
    | 'number'
    | 'areatext'
    | 'date'
    | 'time'
    | 'datetime'
    | 'daterange'
    | 'datetimerange'
    | 'timerange'
    | 'select'
    | 'multiselect'
    | 'combo'
    | 'comboselect'
    | 'multicomboselect'
    | 'checkbox'
    | 'radio'
    | 'switch'
    | 'custom'
    | 'action';
  label?: string;
  placeHolder?: string | string[];
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  rules?: Rule[];
  hidden?: boolean;
  key: string;
  props?: any;
  onClick?: () => void;
  onSubmit?: (values?: any) => void;
  text?: string;
  regex?: string;
  options?: { label: string | React.ReactNode; value: any }[];
  component?: React.ComponentType<any>;
}

interface FancyFormProps {
  render: FieldForm[];
  onFinish?: (values: any) => void;
  className?: string;
  style?: React.CSSProperties;
  initState?: any;
  props?: any;
}

export default function FancyForm({
  render: renderFields,
  onFinish,
  className,
  style,
  initState,
  ...props
}: FancyFormProps) {
  const [form] = Form.useForm();
  const inputRefs = useRef<(any | null)[]>([]);

  const inputFields = renderFields.filter((f) => f.type !== 'action');
  inputRefs.current = new Array(inputFields.length).fill(null);

  useEffect(() => {
    if (initState) {
      form.setFieldsValue(initState);
    }
  }, [initState, form]);

  const handleFinish = (values: any) => {
    onFinish?.(values);
    const actionField = renderFields.find(
      (f) => f.type === 'action' && f.onSubmit,
    );
    if (actionField?.onSubmit) {
      actionField.onSubmit(values);
    }
  };

  const renderField = (field: FieldForm, index: number) => {
    if (field.type === 'action') {
      const handleClick = async () => {
        if (field.onClick) {
          field.onClick();
        } else if (field.onSubmit) {
          try {
            await form.validateFields();
            field.onSubmit(form.getFieldsValue());
          } catch (error) {}
        }
      };
      return (
        <Button
          key={field.key || index}
          {...field.props}
          onClick={field.onClick || field.onSubmit ? handleClick : undefined}
        >
          {field.text}
        </Button>
      );
    }

    if (field.hidden) return null;

    const inputIndex = inputFields.indexOf(field);

    const rules: Rule[] = [];
    if (field.rules) {
      rules.push(...field.rules);
    }
    if (field.regex) {
      rules.push({
        pattern: new RegExp(field.regex),
        message: 'Invalid format',
      });
    }

    const commonProps = {
      placeholder: field.placeHolder,
      suffix: field.rightComponent,
      ...field.props,
      ...(inputIndex >= 0
        ? {
            onPressEnter: () => {
              if (inputIndex < inputFields.length - 1) {
                inputRefs.current[inputIndex + 1]?.focus?.();
              } else {
                form.submit();
              }
            },
            ref: (el: any) => {
              inputRefs.current[inputIndex] = el;
            },
          }
        : {}),
    };

    let inputComponent: React.ReactNode;

    switch (field.type) {
      case 'text':
        inputComponent = (
          <Input {...commonProps} prefix={field.leftComponent} />
        );
        break;
      case 'password':
        inputComponent = (
          <Input.Password {...commonProps} prefix={field.leftComponent} />
        );
        break;
      case 'tel':
        if (field.options && field.options.length > 0) {
          inputComponent = (
            <div style={{ display: 'flex' }}>
              <Select
                {...field.props}
                options={field.options}
                style={{
                  width: '30%',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
                placeholder="Code"
              />
              <Input
                {...commonProps}
                type="tel"
                prefix={field.leftComponent}
                style={{
                  width: '70%',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  ...commonProps.style,
                }}
              />
            </div>
          );
        } else {
          inputComponent = (
            <Input {...commonProps} type="tel" prefix={field.leftComponent} />
          );
        }
        break;
      case 'number':
        inputComponent = (
          <InputNumber {...commonProps} style={{ width: '100%' }} />
        );
        break;
      case 'areatext':
        inputComponent = <Input.TextArea {...commonProps} />;
        break;
      case 'date':
        inputComponent = (
          <DatePicker {...commonProps} style={{ width: '100%' }} />
        );
        break;
      case 'time':
        inputComponent = (
          <TimePicker {...commonProps} style={{ width: '100%' }} />
        );
        break;
      case 'datetime':
        inputComponent = (
          <DatePicker {...commonProps} showTime style={{ width: '100%' }} />
        );
        break;
      case 'daterange':
        inputComponent = (
          <DatePicker.RangePicker {...commonProps} style={{ width: '100%' }} />
        );
        break;
      case 'datetimerange':
        inputComponent = (
          <DatePicker.RangePicker
            {...commonProps}
            showTime
            style={{ width: '100%' }}
          />
        );
        break;
      case 'timerange':
        inputComponent = (
          <TimePicker.RangePicker {...commonProps} style={{ width: '100%' }} />
        );
        break;
      case 'select':
        inputComponent = (
          <Select
            {...commonProps}
            options={field.options}
            style={{ width: '100%' }}
          />
        );
        break;
      case 'multiselect':
        inputComponent = (
          <Select
            {...commonProps}
            mode="multiple"
            options={field.options}
            style={{ width: '100%' }}
          />
        );
        break;
      case 'combo':
        inputComponent = (
          <AutoComplete
            {...commonProps}
            options={field.options}
            style={{ width: '100%' }}
          />
        );
        break;
      case 'comboselect':
        inputComponent = (
          <Select
            {...commonProps}
            showSearch
            options={field.options}
            style={{ width: '100%' }}
          />
        );
        break;
      case 'multicomboselect':
        inputComponent = (
          <Select
            {...commonProps}
            showSearch
            mode="multiple"
            options={field.options}
            style={{ width: '100%' }}
          />
        );
        break;
      case 'checkbox':
        if (field.options && field.options.length > 1) {
          inputComponent = (
            <Checkbox.Group {...commonProps} options={field.options} />
          );
        } else {
          inputComponent = <Checkbox {...commonProps}>{field.label}</Checkbox>;
        }
        break;
      case 'radio':
        inputComponent = (
          <Radio.Group {...commonProps} options={field.options} />
        );
        break;
      case 'switch':
        inputComponent = <Switch {...commonProps} />;
        break;
      case 'custom':
        if (field.component) {
          const CustomComponent = field.component;
          inputComponent = <CustomComponent {...commonProps} />;
        } else {
          inputComponent = <div>Custom component not provided</div>;
        }
        break;
      default:
        inputComponent = <Input {...commonProps} />;
    }

    return (
      <Form.Item
        key={field.key || index}
        label={
          field.type !== 'checkbox' ||
          (field.options && field.options.length > 1)
            ? field.label
            : undefined
        }
        name={
          field.label?.toLowerCase().replace(/\s+/g, '_') || `field_${index}`
        }
        rules={rules}
        valuePropName={field.type === 'switch' ? 'checked' : 'value'}
      >
        {inputComponent}
      </Form.Item>
    );
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      className={className}
      style={style}
      {...props}
    >
      {renderFields.map((field, index) => renderField(field, index))}
    </Form>
  );
}
