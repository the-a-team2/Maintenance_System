import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
} from "../../redux/features/user";
import { useGetAllRolesMutation } from "../../redux/features/role";
import { useGetAllDepartmentsQuery } from "../../redux/features/department";

const EditUser = () => {
  const { userId } = useParams();
  const [updateUser] = useUpdateUserByIdMutation();
  const [getRoles] = useGetAllRolesMutation();
  const [roles, setRoles] = useState([]);
  const {
    data: departments,
    isLoading: departmentLoading,
    error: departmentError,
  } = useGetAllDepartmentsQuery();

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    roleId: 0,
    departmentId: 0,
  });

  useEffect(() => {
    const handleGetAllRoles = async () => {
      try {
        const res = await getRoles().unwrap();
        setRoles(res.items);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    handleGetAllRoles();
  }, [getRoles]);

  const { data, error, isLoading } = useGetUserByIdQuery(userId);

  useEffect(() => {
    if (!isLoading && data) {
      setUserData({
        fullName: data.fullName || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        roleId: data.role.id || 0,
        departmentId: data.department?.id || 0,
      });
    }
  }, [isLoading, data]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const id = userId;
      const res = await updateUser({ id, user: userData }).unwrap();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data.</div>;

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit User
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="fullName"
            label="Full Name"
            fullWidth
            value={userData.fullName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            fullWidth
            value={userData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            value={userData.phoneNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              name="roleId"
              value={userData.roleId}
              onChange={handleChange}
              label="Role"
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Departments</InputLabel>
            <Select
              name="departmentId"
              value={userData.departmentId}
              onChange={handleChange}
              label="Departments"
            >
              {departments.items.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditUser;