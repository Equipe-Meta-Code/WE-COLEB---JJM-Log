import React, { useEffect, useState } from "react";
import api from "../../services/api";

interface PermissionComponentProps {
  children: React.ReactNode;
  role: string;
}

// Define a interface para o componente PermissionComponent
interface PermissionComponentType extends React.FC<PermissionComponentProps> {
  hasPermission: (roleToCheck: string) => Promise<boolean>;
}

const PermissionComponent: PermissionComponentType = ({ role, children }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    loadRoles();
  }, [role]);

  async function loadRoles() {
    try {
      const response = await api.get('/users/roles');
      // Verifica se o usuário tem uma das permissões necessárias
      const findRole = response.data.some((r: string) => role.split(',').includes(r));
      setHasPermission(findRole);
    } catch (error) {
      console.error('Erro ao carregar permissões:', error);
    }
  }

  return (
    <>
      {hasPermission ? children : null}
    </>
  );
};

// Adiciona a função hasPermission como uma propriedade estática do componente PermissionComponent
PermissionComponent.hasPermission = async (roleToCheck: string): Promise<boolean> => {
  try {
    const response = await api.get('/users/roles');
    const findRole = response.data.some((r: string) => roleToCheck.split(',').includes(r));
    return findRole;
  } catch (error) {
    console.error('Erro ao verificar permissões:', error);
    return false;
  }
};

export default PermissionComponent;
