1. make fancy form using form and input of antd
2. using json to render fields in form
3.
```ts
    const fields: FieldForm[] = [
        {
            type: 'text',
            label: 'Username',
            placeHolder: 'Enter username...',
            leftComponent: {
                <UserIcon/>
            },
            rules: [
                {required: true, message: 'username is required'},
                {
                    minLength: 2, message: 'min length is 2 characters'
                },
                {
                    validator()//custom antd rule
                },
                {
                    regex: ''
                }
            ]
        },
        {
            type: 'password',
            label: 'Password',
            placeHolder: 'Enter password',
            hidden: false
        },
        {
            type: 'action',
            props: {
                type: 'primary',
            },
            onClick: {},
            text: 'Clear form'  
        },
        {
            type: 'action',
            props: {
                type: 'primary',
            },
            onSubmit: {},
            text: 'Login'  
        }
    ]
```
4.
```ts
return (
    <FancyForm renderFields={fields}/>
)
```
5. type fields include: text, password, tel, number, date, time, datetime, daterange, select, multiselect, combo, comboselect, checkbox, radio, switch, custom