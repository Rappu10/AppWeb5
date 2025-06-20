// UserForm.tsx
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

interface UserData {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

const UserForm: React.FC = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<UserData>({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    role: '',
  });

  const handleFinish = (values: UserData) => {
    console.log('Datos del usuario:', values);
    setFormData(values);
    // Aquí puedes hacer el POST a tu backend
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={formData}
      >
        <Form.Item label="Nombre completo" name="fullName" rules={[{ required: true, message: 'Este campo es requerido' }]}>
          <Input placeholder="Nombre completo" />
        </Form.Item>

        <Form.Item label="Usuario" name="username" rules={[{ required: true, message: 'Este campo es requerido' }]}>
          <Input placeholder="Nombre de usuario" />
        </Form.Item>

        <Form.Item label="Correo" name="email" rules={[
          { required: true, message: 'Este campo es requerido' },
          { type: 'email', message: 'Ingresa un correo válido' }
        ]}>
          <Input placeholder="Correo electrónico" />
        </Form.Item>

        <Form.Item label="Teléfono" name="phone" rules={[{ required: true, message: 'Este campo es requerido' }]}>
          <Input placeholder="Número telefónico" />
        </Form.Item>

        <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Este campo es requerido' }]}>
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Form.Item label="Rol" name="role" rules={[{ required: true, message: 'Este campo es requerido' }]}>
          <Input placeholder="admin, user, etc." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Guardar Usuario
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserForm;
