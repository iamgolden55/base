"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Textarea,
  Pagination
} from "@nextui-org/react";
import { Edit, Trash2, Search, Plus, Filter } from "lucide-react";

const statusColorMap: Record<string, "success" | "danger" | "warning" | "default" | "primary" | "secondary"> = {
  active: "success",
  inactive: "danger",
  vacation: "warning",
};

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "DEPARTMENT", uid: "department" },
  { name: "ACTIONS", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Dr. Tony Stark",
    role: "Doctor",
    status: "active",
    department: "Cardiology",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.stark@hospital.com",
  },
  {
    id: 2,
    name: "Nurse Jane Foster",
    role: "Nurse",
    status: "active",
    department: "Emergency",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "jane.foster@hospital.com",
  },
  {
    id: 3,
    name: "Dr. Bruce Banner",
    role: "Doctor",
    status: "vacation",
    department: "Neurology",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "bruce.banner@hospital.com",
  },
  // Add more staff members as needed
];

const ROLES = ["All Roles", "Doctor", "Nurse", "Administrative"];
const DEPARTMENTS = ["All Departments", "Cardiology", "Emergency", "Neurology"];
const STATUS = ["All Status", "Active", "Inactive", "Vacation"];

export default function AllStaff() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedRole, setSelectedRole] = useState<Selection>(new Set(["All Roles"]));
  const [selectedDepartment, setSelectedDepartment] = useState<Selection>(new Set(["All Departments"]));
  const [selectedStatus, setSelectedStatus] = useState<Selection>(new Set(["All Status"]));
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'active',
    phone: '',
    specialization: '',
    bio: ''
  });
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const hasSearch = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearch) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.email.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    const role = Array.from(selectedRole)[0];
    if (role && role !== "All Roles") {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
    }

    const department = Array.from(selectedDepartment)[0];
    if (department && department !== "All Departments") {
      filteredUsers = filteredUsers.filter((user) => user.department === department);
    }

    const status = Array.from(selectedStatus)[0] as string;
    if (status && status !== "All Status") {
      filteredUsers = filteredUsers.filter((user) => 
        user.status.toLowerCase() === status.toLowerCase()
      );
    }

    return filteredUsers;
  }, [filterValue, selectedRole, selectedDepartment, selectedStatus]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof typeof user];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[cellValue as keyof typeof statusColorMap]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "department":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Edit staff">
              <Button 
                isIconOnly 
                size="sm" 
                variant="light"
                onPress={() => handleEdit(user)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Delete staff" color="danger">
              <Button isIconOnly size="sm" variant="light" color="danger">
                <Trash2 className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const handleAddStaff = () => {
    // TODO: Implement API call to add staff
    console.log('New Staff Data:', newStaff);
    onClose();
    setNewStaff({
      name: '',
      email: '',
      role: '',
      department: '',
      status: 'active',
      phone: '',
      specialization: '',
      bio: ''
    });
  };

  const handleEdit = (staff: any) => {
    setIsEditing(true);
    setSelectedStaff(staff);
    setNewStaff({
      name: staff.name,
      email: staff.email,
      role: staff.role,
      department: staff.department,
      status: staff.status,
      phone: staff.phone || '',
      specialization: staff.specialization || '',
      bio: staff.bio || ''
    });
    onOpen();
  };

  const handleUpdate = () => {
    // TODO: Implement API call to update staff
    console.log('Updated Staff Data:', newStaff);
    onClose();
    setIsEditing(false);
    setSelectedStaff(null);
    setNewStaff({
      name: '',
      email: '',
      role: '',
      department: '',
      status: 'active',
      phone: '',
      specialization: '',
      bio: ''
    });
  };

  const renderStaffModal = () => (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {isEditing ? "Edit Staff Member" : "Add New Staff Member"}
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="Enter full name"
              value={newStaff.name}
              onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
            />
            <Input
              label="Email"
              placeholder="Enter email address"
              type="email"
              value={newStaff.email}
              onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
            />
            <Select
              label="Role"
              placeholder="Select role"
              selectedKeys={[newStaff.role]}
              onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
            >
              {ROLES.filter(role => role !== "All Roles").map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Department"
              placeholder="Select department"
              selectedKeys={[newStaff.department]}
              onChange={(e) => setNewStaff({...newStaff, department: e.target.value})}
            >
              {DEPARTMENTS.filter(dept => dept !== "All Departments").map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Status"
              placeholder="Select status"
              selectedKeys={[newStaff.status]}
              onChange={(e) => setNewStaff({...newStaff, status: e.target.value})}
            >
              {STATUS.filter(status => status !== "All Status").map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </Select>
            <Input
              label="Phone Number"
              placeholder="Enter phone number"
              value={newStaff.phone}
              onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
            />
            <Input
              label="Specialization"
              placeholder="Enter specialization"
              value={newStaff.specialization}
              onChange={(e) => setNewStaff({...newStaff, specialization: e.target.value})}
            />
            <div className="col-span-2">
              <Textarea
                label="Bio"
                placeholder="Enter staff bio"
                value={newStaff.bio}
                onChange={(e) => setNewStaff({...newStaff, bio: e.target.value})}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button 
            color="primary" 
            onPress={isEditing ? handleUpdate : handleAddStaff}
          >
            {isEditing ? "Update Staff" : "Add Staff"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<Search className="h-4 w-4" />}
            value={filterValue}
            onValueChange={setFilterValue}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  startContent={<Filter className="h-4 w-4" />}
                >
                  Role
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                disallowEmptySelection
                aria-label="Role Filter"
                selectedKeys={selectedRole}
                selectionMode="single"
                onSelectionChange={setSelectedRole}
              >
                {ROLES.map((role) => (
                  <DropdownItem key={role}>{role}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  startContent={<Filter className="h-4 w-4" />}
                >
                  Department
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                disallowEmptySelection
                aria-label="Department Filter"
                selectedKeys={selectedDepartment}
                selectionMode="single"
                onSelectionChange={setSelectedDepartment}
              >
                {DEPARTMENTS.map((dept) => (
                  <DropdownItem key={dept}>{dept}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  startContent={<Filter className="h-4 w-4" />}
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                disallowEmptySelection
                aria-label="Status Filter"
                selectedKeys={selectedStatus}
                selectionMode="single"
                onSelectionChange={setSelectedStatus}
              >
                {STATUS.map((status) => (
                  <DropdownItem key={status}>{status}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button color="primary" startContent={<Plus className="h-4 w-4" />} onPress={onOpen}>
              Add New Staff
            </Button>
          </div>
        </div>

        <Table 
          aria-label="Staff table with custom cells"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn 
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {renderStaffModal()}
    </div>
  );
}
