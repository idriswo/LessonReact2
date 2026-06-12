import { memo, useState } from 'react'
import { MoreHorizontalIcon, PlusIcon, SearchIcon, PencilIcon, Trash2Icon, InfoIcon } from "lucide-react"

import { Button } from "../components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Field, FieldGroup } from "../components/ui/field"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

import { useAtom } from 'jotai'
import { useStore } from '../zustand/dataZustand'
import { dataAtom, addressAtom, statusAtom } from '../jotai/dataAtom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { deleteData, addData, editData, setName, setSurname, setSearch, resetReduxInputs } from '../reducer/dataSlice'


const CrudRZj = memo(() => {

    const store = useStore((state) => state.dataZustand)
    const addDataZustand = useStore((state) => state.addDataZustand)
    const editDataZustand = useStore((state) => state.editDataZustand)
    const jobInput = useStore((state) => state.jobInput)
    const ageInput = useStore((state) => state.ageInput)
    const setJobInput = useStore((state) => state.setJobInput)
    const setAgeInput = useStore((state) => state.setAgeInput)
    const resetZustandInputs = useStore((state) => state.resetZustandInputs)

    const [atom, setAtom] = useAtom(dataAtom)
    const [addressInput, setAddressInput] = useAtom(addressAtom)
    const [statusInput, setStatusInput] = useAtom(statusAtom)

    const { dataR, nameInput, surnameInput, search } = useSelector(({ dataRTK }: RootState) => dataRTK)
    const dispatch = useDispatch()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [editId, setEditId] = useState<number | null>(null)
    const [infoId, setInfoId] = useState<number | null>(null)

    const toggleStatus = (id: number) => {
        setAtom(prev => ({
            dataJotai: prev.dataJotai.map(item => item.id === id ? { ...item, status: !item.status } : item)
        }));
    };

    const openEdit = (item: {id:number,name:string,surname:string,job:string,age:number,address:string,status:boolean}) => {
        setEditId(item.id);
        dispatch(setName(item.name));
        dispatch(setSurname(item.surname));
        setJobInput(item.job);
        setAgeInput(item.age);
        setAddressInput(item.address);
        setStatusInput(item.status);
        setIsEditDialogOpen(true);
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = Date.now();

        dispatch(addData({
            id: newId,
            name: nameInput,
            surname: surnameInput
        }));

        addDataZustand({
            id: newId,
            job: jobInput,
            age: Number(ageInput)
        });

        setAtom(prev => ({
            dataJotai: [...prev.dataJotai, {
                id: newId,
                address: addressInput,
                status: statusInput
            }]
        }));

        dispatch(resetReduxInputs());
        resetZustandInputs();
        setAddressInput('');
        setStatusInput(false);
        setIsDialogOpen(false);
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId === null) return;

        dispatch(editData({
            id: editId,
            name: nameInput,
            surname: surnameInput
        }));

        editDataZustand({
            id: editId,
            job: jobInput,
            age: Number(ageInput)
        });

        setAtom(prev => ({
            dataJotai: prev.dataJotai.map(item => item.id === editId ? {
                id: editId,
                address: addressInput,
                status: statusInput
            } : item)
        }));

        dispatch(resetReduxInputs());
        resetZustandInputs();
        setAddressInput('');
        setStatusInput(false);
        setIsEditDialogOpen(false);
        setEditId(null);
    };

    const filteredData = dataR.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    const data = filteredData.map(el => {
        const zustandData = store.find((z) => z.id == el.id)
        const atomData = atom.dataJotai.find((a) => a.id == el.id)

        return { ...el, ...zustandData, ...atomData }

    });

    const infoItem = data.find(d => d.id === infoId);

    return (
        <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-blue-50 p-8 text-slate-800 font-sans selection:bg-blue-200">
            <div className='max-w-[1400px] mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden ring-1 ring-slate-900/5'>
                
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-8 border-b border-slate-100/60 bg-white/50 gap-4'>
                    <div>
                        <h1 className='text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 pb-1' >
                            Users
                        </h1>
                    </div>

                    <div className='flex items-center gap-4 w-full sm:w-auto'>
                        <div className="relative group flex-1 sm:flex-none">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                <SearchIcon className="w-4 h-4" />
                            </div>
                            <Input 
                                placeholder="Search by name..." 
                                value={search} 
                                onChange={(e) => dispatch(setSearch(e.target.value))}
                                className="pl-10 w-full sm:w-80 rounded-2xl border-slate-200 bg-white shadow-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-300 h-11"
                            />
                        </div>
                        
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="h-11 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-0 font-semibold px-6">
                                    <PlusIcon className="w-5 h-5 mr-1.5" /> Add User
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md rounded-3xl border-slate-100 shadow-2xl p-0 overflow-hidden bg-white/95 backdrop-blur-xl">
                                <form onSubmit={handleAdd}>
                                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-slate-800">Add New User</DialogTitle>
                                            
                                        </DialogHeader>
                                    </div>
                                    <FieldGroup className="max-h-[55vh] overflow-y-auto p-6 space-y-4 custom-scrollbar">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Field>
                                                <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-500">First Name</Label>
                                                <Input id="name" name="name" value={nameInput} onChange={(e) => dispatch(setName(e.target.value))} required className="rounded-xl h-11 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                                            </Field>
                                            <Field>
                                                <Label htmlFor="surname" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Last Name</Label>
                                                <Input id="surname" name="surname" value={surnameInput} onChange={(e) => dispatch(setSurname(e.target.value))} required className="rounded-xl h-11 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                                            </Field>
                                        </div>
                                        <Field>
                                            <Label htmlFor="job" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Job Title</Label>
                                            <Input id="job" name="job" value={jobInput} onChange={(e) => setJobInput(e.target.value)} required className="rounded-xl h-11 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="age" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Age</Label>
                                            <Input type="number" id="age" name="age" value={ageInput} onChange={(e) => setAgeInput(e.target.value)} required className="rounded-xl h-11 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="address" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Address</Label>
                                            <Input id="address" name="address" value={addressInput} onChange={(e) => setAddressInput(e.target.value)} required className="rounded-xl h-11 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                                        </Field>
                                        <div className="pt-2 pb-1">
                                            <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-200 bg-slate-50/50 hover:bg-indigo-50/30 cursor-pointer transition-all">
                                                <Input type="checkbox" id="status" name="status" checked={statusInput} onChange={(e) => setStatusInput(e.target.checked)} className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-slate-800">Active Status</span>
                                                    <span className="text-xs text-slate-500">Grant immediate access to the platform</span>
                                                </div>
                                            </label>
                                        </div>
                                    </FieldGroup>
                                    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                                        <DialogClose asChild>
                                            <Button type="button" variant="outline" className="rounded-xl font-medium px-5 h-10 hover:bg-slate-100">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 h-10 shadow-md shadow-indigo-200 transition-all">Create User</Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogContent className="sm:max-w-md rounded-3xl border-slate-100 shadow-2xl p-0 overflow-hidden bg-white/95 backdrop-blur-xl">
                                <form onSubmit={handleEdit}>
                                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-slate-800">Edit Profile</DialogTitle>
                                            <DialogDescription className="text-slate-500">
                                                Update the details for this team member.
                                            </DialogDescription>
                                        </DialogHeader>
                                    </div>
                                    <FieldGroup className="max-h-[55vh] overflow-y-auto p-6 space-y-4 custom-scrollbar">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Field>
                                                <Label htmlFor="edit-name" className="text-xs font-semibold uppercase tracking-wider text-slate-500">First Name</Label>
                                                <Input id="edit-name" name="name" value={nameInput} onChange={(e) => dispatch(setName(e.target.value))} required className="rounded-xl h-11 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                                            </Field>
                                            <Field>
                                                <Label htmlFor="edit-surname" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Last Name</Label>
                                                <Input id="edit-surname" name="surname" value={surnameInput} onChange={(e) => dispatch(setSurname(e.target.value))} required className="rounded-xl h-11 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                                            </Field>
                                        </div>
                                        <Field>
                                            <Label htmlFor="edit-job" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Job Title</Label>
                                            <Input id="edit-job" name="job" value={jobInput} onChange={(e) => setJobInput(e.target.value)} required className="rounded-xl h-11 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="edit-age" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Age</Label>
                                            <Input type="number" id="edit-age" name="age" value={ageInput} onChange={(e) => setAgeInput(e.target.value)} required className="rounded-xl h-11 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="edit-address" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Address</Label>
                                            <Input id="edit-address" name="address" value={addressInput} onChange={(e) => setAddressInput(e.target.value)} required className="rounded-xl h-11 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                                        </Field>
                                        <div className="pt-2 pb-1">
                                            <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-200 bg-slate-50/50 hover:bg-indigo-50/30 cursor-pointer transition-all">
                                                <Input type="checkbox" id="edit-status" name="status" checked={statusInput} onChange={(e) => setStatusInput(e.target.checked)} className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-slate-800">Active Status</span>
                                                    <span className="text-xs text-slate-500">Grant immediate access to the platform</span>
                                                </div>
                                            </label>
                                        </div>
                                    </FieldGroup>
                                    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                                        <DialogClose asChild>
                                            <Button type="button" variant="outline" className="rounded-xl font-medium px-5 h-10 hover:bg-slate-100" onClick={() => {
                                                dispatch(resetReduxInputs());
                                                resetZustandInputs();
                                                setAddressInput('');
                                                setStatusInput(false);
                                                setEditId(null);
                                            }}>Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 h-10 shadow-md shadow-indigo-200 transition-all">Save Changes</Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Dialog open={infoId !== null} onOpenChange={(open) => { if (!open) setInfoId(null); }}>
                    <DialogContent className="sm:max-w-md rounded-3xl border-slate-100 shadow-2xl p-0 overflow-hidden bg-white/95 backdrop-blur-xl">
                        {infoItem && (
                            <>
                                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold text-slate-800">User Info</DialogTitle>
                                    </DialogHeader>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold text-2xl border border-indigo-200/50 shadow-sm">
                                            {infoItem.name.charAt(0)}{infoItem.surname.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-800">{infoItem.name} {infoItem.surname}</h3>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Job Title</span>
                                            <p className="text-slate-800 font-medium mt-1">{infoItem.job}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Age</span>
                                            <p className="text-slate-800 font-medium mt-1">{infoItem.age}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Address</span>
                                            <p className="text-slate-800 font-medium mt-1">{infoItem.address}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Status</span>
                                            <div className="mt-1">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${infoItem.status ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${infoItem.status ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-400'}`}></span>
                                                    {infoItem.status ? "Active" : "Offline"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline" className="rounded-xl font-medium px-5 h-10 hover:bg-slate-100">Close</Button>
                                    </DialogClose>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

                <div className="p-0 overflow-x-auto">
                    <Table className="w-full min-w-[800px]">
                        <TableHeader className="bg-slate-50/80">
                            <TableRow className="border-b border-slate-200 hover:bg-transparent">
                                <TableHead className="w-12 py-5 pl-6 pr-2"></TableHead>
                                <TableHead className="py-5 px-6 font-semibold text-xs uppercase tracking-wider text-slate-500">Member</TableHead>
                                <TableHead className="py-5 px-6 font-semibold text-xs uppercase tracking-wider text-slate-500">Age</TableHead>
                                <TableHead className="py-5 px-6 font-semibold text-xs uppercase tracking-wider text-slate-500">Role</TableHead>
                                <TableHead className="py-5 px-6 font-semibold text-xs uppercase tracking-wider text-slate-500">Location</TableHead>
                                <TableHead className="py-5 px-6 font-semibold text-xs uppercase tracking-wider text-slate-500">Status</TableHead>
                                <TableHead className="py-5 px-6 font-semibold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id} className={`group hover:bg-indigo-50/40 transition-colors duration-200 border-b border-slate-100 last:border-0 ${item.status ? 'bg-emerald-50/20' : ''}`}>
                                    <TableCell className="w-12 py-4 pl-6 pr-2">
                                        <Input 
                                            type="checkbox" 
                                            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer transition-colors"
                                            checked={item.status}
                                            onChange={() => toggleStatus(item.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200/50 shadow-sm">
                                                {item.name.charAt(0)}{item.surname.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">{item.name} {item.surname}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 px-6 text-slate-600 font-medium">{item.age}</TableCell>
                                    <TableCell className="py-4 px-6">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                            {item.job}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-4 px-6 text-slate-600">
                                        <div className="flex items-center gap-1.5">
                                            <span className="truncate max-w-[150px] font-medium">{item.address}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 px-6">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${item.status ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${item.status ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-400'}`}></span>
                                            {item.status ? "Active" : "Offline"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-4 px-6 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
                                                    <MoreHorizontalIcon className="h-4 w-4" />
                                                    <span className="sr-only">Open menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-lg border-slate-100 p-1 bg-white/95 backdrop-blur-xl">
                                                <DropdownMenuItem onClick={() => openEdit(item)} className="cursor-pointer gap-2.5 rounded-lg focus:bg-indigo-50 focus:text-indigo-700 py-2 font-medium">
                                                    <PencilIcon className="w-4 h-4" /> Edit Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-lg focus:bg-slate-50 py-2 text-slate-700 font-medium" onClick={() => setInfoId(item.id)}>
                                                    <InfoIcon className="w-4 h-4 text-slate-400" /> View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-slate-100 my-1" />
                                                <DropdownMenuItem variant="destructive" onClick={() => dispatch(deleteData(item.id))} className="cursor-pointer gap-2.5 rounded-lg focus:bg-rose-50 focus:text-rose-700 text-rose-600 py-2 font-medium">
                                                    <Trash2Icon className="w-4 h-4" /> Delete User
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-48 text-center text-slate-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <SearchIcon className="w-8 h-8 text-slate-300" />
                                            <p className="text-base font-medium text-slate-600">No users found</p>
                                            <p className="text-sm">Try adjusting your search query.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
})

export default CrudRZj