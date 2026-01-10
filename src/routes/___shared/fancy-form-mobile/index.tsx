import {
  CalendarOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  DownOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  List,
  Radio,
  Switch,
  TimePicker,
} from 'antd';
import type { Rule } from 'antd/es/form';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { colors } from '@/helpers/constants/colors';
import { WheelPicker, WheelPickerWrapper } from '../wheel-picker';

interface DateWheelPickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  style?: React.CSSProperties;
}

const DateWheelPicker: React.FC<DateWheelPickerProps> = ({
  value,
  onChange,
  style,
}) => {
  const currentDate = value || new Date();

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => ({
      value: currentYear - 50 + i,
      label: String(currentYear - 50 + i),
    }));
  }, []);

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: i,
        label: new Date(0, i).toLocaleString('en', { month: 'long' }),
      })),
    [],
  );

  const days = useMemo(() => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => ({
      value: i + 1,
      label: String(i + 1),
    }));
  }, [currentDate.getFullYear(), currentDate.getMonth()]);

  const handleYearChange = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    // Adjust day if it's invalid for the new year/month
    const daysInNewMonth = new Date(
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      0,
    ).getDate();
    if (newDate.getDate() > daysInNewMonth) {
      newDate.setDate(daysInNewMonth);
    }
    onChange?.(newDate);
  };

  const handleMonthChange = (month: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    // Adjust day if it's invalid for the new month
    const daysInNewMonth = new Date(
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      0,
    ).getDate();
    if (newDate.getDate() > daysInNewMonth) {
      newDate.setDate(daysInNewMonth);
    }
    onChange?.(newDate);
  };

  const handleDayChange = (day: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    onChange?.(newDate);
  };

  return (
    <div style={style}>
      <WheelPickerWrapper>
        <WheelPicker
          options={years}
          value={currentDate.getFullYear()}
          onValueChange={handleYearChange}
        />
        <WheelPicker
          options={months}
          value={currentDate.getMonth()}
          onValueChange={handleMonthChange}
        />
        <WheelPicker
          options={days}
          value={currentDate.getDate()}
          onValueChange={handleDayChange}
        />
      </WheelPickerWrapper>
    </div>
  );
};

interface TimeWheelPickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  style?: React.CSSProperties;
}

const TimeWheelPicker: React.FC<TimeWheelPickerProps> = ({
  value,
  onChange,
  style,
}) => {
  const currentTime = value || new Date();

  const hours = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        value: i,
        label: String(i).padStart(2, '0'),
      })),
    [],
  );

  const minutes = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        value: i,
        label: String(i).padStart(2, '0'),
      })),
    [],
  );

  const handleHourChange = (hour: number) => {
    const newTime = new Date(currentTime);
    newTime.setHours(hour);
    onChange?.(newTime);
  };

  const handleMinuteChange = (minute: number) => {
    const newTime = new Date(currentTime);
    newTime.setMinutes(minute);
    onChange?.(newTime);
  };

  return (
    <div style={style}>
      <WheelPickerWrapper>
        <WheelPicker
          options={hours}
          value={currentTime.getHours()}
          onValueChange={handleHourChange}
        />
        <WheelPicker
          options={minutes}
          value={currentTime.getMinutes()}
          onValueChange={handleMinuteChange}
        />
      </WheelPickerWrapper>
    </div>
  );
};

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

interface FancyFormMobileProps {
  render: FieldForm[];
  onFinish?: (values: any) => void;
  className?: string;
  style?: React.CSSProperties;
  initState?: any;
  props?: any;
}

export default function FancyFormMobile({
  render: renderFields,
  onFinish,
  className,
  style,
  initState,
  ...props
}: FancyFormMobileProps) {
  const [form] = Form.useForm();
  const inputRefs = useRef<(any | null)[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<
    { label: string | React.ReactNode; value: any }[]
  >([]);
  const [drawerFieldKey, setDrawerFieldKey] = useState<string>('');
  const [drawerMultiple, setDrawerMultiple] = useState(false);
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  const [drawerSearch, setDrawerSearch] = useState('');
  const [drawerHasSearch, setDrawerHasSearch] = useState(false);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [currentPickerField, setCurrentPickerField] = useState<string>('');

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

  const openDrawer = (field: FieldForm) => {
    setDrawerOptions(field.options || []);
    setDrawerFieldKey(field.key);
    setDrawerMultiple(['multiselect', 'multicomboselect'].includes(field.type));
    // whether this drawer should show a search box (useful for combo/comboselect)
    setDrawerHasSearch(
      ['combo', 'comboselect', 'multicomboselect', 'multiselect'].includes(
        field.type,
      ),
    );
    setDrawerSearch('');

    const currentValue = form.getFieldValue(field.key);
    setSelectedValues(
      Array.isArray(currentValue)
        ? currentValue
        : currentValue
          ? [currentValue]
          : [],
    );
    setDrawerVisible(true);
  };

  const handleDrawerSelect = (value: any) => {
    if (drawerMultiple) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(newValues);
    } else {
      form.setFieldsValue({ [drawerFieldKey]: value });
      setDrawerVisible(false);
    }
  };

  const handleDrawerConfirm = () => {
    if (drawerMultiple) {
      form.setFieldsValue({ [drawerFieldKey]: selectedValues });
    }
    setDrawerVisible(false);
  };

  const openDatePicker = (fieldKey: string) => {
    setCurrentPickerField(fieldKey);
    setDatePickerVisible(true);
  };

  const openTimePicker = (fieldKey: string) => {
    setCurrentPickerField(fieldKey);
    setTimePickerVisible(true);
  };

  const handleDateChange = (date: Date) => {
    // Update the form value live, but don't close the picker here.
    // The Drawer should only be closed when the user confirms with the "Done" button.
    form.setFieldsValue({ [currentPickerField]: date });
  };

  const handleTimeChange = (time: Date) => {
    // Update the form value live, but don't close the picker here.
    // The Drawer should only be closed when the user confirms with the "Done" button.
    form.setFieldsValue({ [currentPickerField]: time });
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

    const defaultSuffix =
      field.type === 'date' ? (
        <CalendarOutlined style={{ color: '#5b5b52' }} />
      ) : field.type === 'time' ? (
        <ClockCircleOutlined style={{ color: '#5b5b52' }} />
      ) : [
          'select',
          'multiselect',
          'combo',
          'comboselect',
          'multicomboselect',
        ].includes(field.type) ? (
        <DownOutlined style={{ color: '#5b5b52', width: '12px' }} />
      ) : undefined;

    const commonProps = {
      placeholder: field.placeHolder,
      suffix: field.rightComponent ?? defaultSuffix,
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
              <Input
                {...field.props}
                readOnly
                suffix={
                  <DownOutlined style={{ color: '#5b5b52', width: '12px' }} />
                }
                onClick={() =>
                  openDrawer({ ...field, key: `${field.key}_code` })
                }
                value={
                  field.options?.find(
                    (opt) =>
                      opt.value === form.getFieldValue(`${field.key}_code`),
                  )?.label || ''
                }
                placeholder="Code"
                style={{
                  width: '30%',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
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
          <Input
            {...commonProps}
            readOnly
            onClick={() => openDatePicker(field.key)}
            value={form.getFieldValue(field.key)?.toLocaleDateString() || ''}
            style={{ width: '100%' }}
          />
        );
        break;
      case 'time':
        inputComponent = (
          <Input
            {...commonProps}
            readOnly
            onClick={() => openTimePicker(field.key)}
            value={
              form.getFieldValue(field.key)?.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }) || ''
            }
            style={{ width: '100%' }}
          />
        );
        break;
      case 'datetime':
        inputComponent = (
          <Input
            {...commonProps}
            readOnly
            onClick={() => openDatePicker(field.key)}
            value={form.getFieldValue(field.key)?.toLocaleString() || ''}
            style={{ width: '100%' }}
          />
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
          <Input
            {...commonProps}
            readOnly
            onClick={() => openDrawer(field)}
            value={
              field.options?.find(
                (opt) => opt.value === form.getFieldValue(field.key),
              )?.label || ''
            }
            style={{ width: '100%' }}
          />
        );
        break;
      case 'multiselect':
        inputComponent = (
          <Input
            {...commonProps}
            readOnly
            onClick={() => openDrawer(field)}
            value={
              form
                .getFieldValue(field.key)
                ?.map(
                  (val: any) =>
                    field.options?.find((opt) => opt.value === val)?.label,
                )
                .join(', ') || ''
            }
            style={{ width: '100%' }}
          />
        );
        break;
      case 'combo':
        inputComponent = (
          <Input
            {...commonProps}
            onClick={() => openDrawer(field)}
            value={
              field.options?.find(
                (opt) => opt.value === form.getFieldValue(field.key),
              )?.label || ''
            }
            style={{ width: '100%' }}
          />
        );
        break;
      case 'comboselect':
        inputComponent = (
          <Input
            {...commonProps}
            readOnly
            onClick={() => openDrawer(field)}
            value={
              field.options?.find(
                (opt) => opt.value === form.getFieldValue(field.key),
              )?.label || ''
            }
            style={{ width: '100%' }}
          />
        );
        break;
      case 'multicomboselect':
        inputComponent = (
          <Input
            {...commonProps}
            readOnly
            onClick={() => openDrawer(field)}
            value={
              form
                .getFieldValue(field.key)
                ?.map(
                  (val: any) =>
                    field.options?.find((opt) => opt.value === val)?.label,
                )
                .join(', ') || ''
            }
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
        name={field.key}
        rules={rules}
        valuePropName={field.type === 'switch' ? 'checked' : 'value'}
      >
        {inputComponent}
      </Form.Item>
    );
  };

  return (
    <>
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
      <Drawer
        title={
          drawerFieldKey.endsWith('_code') ? 'Select Code' : 'Select Options'
        }
        placement="bottom"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        height="60%"
        extra={
          drawerMultiple ? (
            <Button onClick={handleDrawerConfirm}>Confirm</Button>
          ) : null
        }
      >
        {drawerHasSearch && (
          <Input
            placeholder="Search..."
            value={drawerSearch}
            onChange={(e) => setDrawerSearch(e.target.value)}
            style={{ marginBottom: 12 }}
            autoFocus
            allowClear
          />
        )}
        <List
          dataSource={drawerOptions.filter((item) =>
            drawerSearch
              ? typeof item.label === 'string'
                ? item.label.toLowerCase().includes(drawerSearch.toLowerCase())
                : String(item.label)
                    .toLowerCase()
                    .includes(drawerSearch.toLowerCase())
              : true,
          )}
          renderItem={(item) => (
            <div
              onClick={() => handleDrawerSelect(item.value)}
              style={{
                cursor: 'pointer',
                backgroundColor: selectedValues.includes(item.value)
                  ? colors.primaryForeground + '20'
                  : 'transparent',
                color: selectedValues.includes(item.value)
                  ? 'white'
                  : undefined,
                padding: '12px 16px',
                borderRadius: 8,
                fontWeight: selectedValues.includes(item.value) ? '600' : '400',
                border: `1px solid ${selectedValues.includes(item.value) ? `${colors.primary}` : `transparent`}`,
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {item.label}
              {selectedValues.includes(item.value) && (
                <CheckOutlined style={{ color: colors.primary }} />
              )}
            </div>
          )}
        />
        {drawerHasSearch &&
          drawerOptions.filter((item) =>
            drawerSearch
              ? typeof item.label === 'string'
                ? item.label.toLowerCase().includes(drawerSearch.toLowerCase())
                : String(item.label)
                    .toLowerCase()
                    .includes(drawerSearch.toLowerCase())
              : true,
          ).length === 0 && (
            <div style={{ padding: 12, color: '#888' }}>No results</div>
          )}
      </Drawer>
      <Drawer
        title="Select Date"
        placement="bottom"
        onClose={() => setDatePickerVisible(false)}
        open={datePickerVisible}
        extra={
          <Button onClick={() => setDatePickerVisible(false)}>Done</Button>
        }
      >
        <DateWheelPicker
          value={form.getFieldValue(currentPickerField)}
          onChange={handleDateChange}
          style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
        />
      </Drawer>
      <Drawer
        title="Select Time"
        placement="bottom"
        onClose={() => setTimePickerVisible(false)}
        open={timePickerVisible}
        height="50%"
        extra={
          <Button onClick={() => setTimePickerVisible(false)}>Done</Button>
        }
      >
        <TimeWheelPicker
          value={form.getFieldValue(currentPickerField)}
          onChange={handleTimeChange}
          style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
        />
      </Drawer>
    </>
  );
}
