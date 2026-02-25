import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComponentSchema } from "@/schemas/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import type z from "zod";
import { format } from 'date-fns';
import { age, roles, gender, locations, experiences, responseData, experienceDetails } from '../../data/components';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDownIcon, ChevronsUpDown, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";

type Role = {
  id: number;
  name: string;
}

type Gender = {
  id: number;
  name: string;
}

type Location = {
  id: number;
  name: string;
  isSelected: boolean;
};

type Experience = {
  id: number;
  years: string;
};

type ExperienceDetail = {
  companyName: string;
  email: string;
  idProof: { id: number; name: string }[];
};

const Components = () => {
  const form = useForm<z.infer<typeof ComponentSchema>>({
    resolver: zodResolver(ComponentSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      age: "",
      role: responseData.role.toString() || "",
      description: "",
      gender: "",
      notifications: false,
      dob: undefined,
      location: [],
      isActive: false,
      experience: "",
      experienceDetails: [
        {
          companyName: "",
          email: "",
          idProof: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experienceDetails",
  });

  useEffect(() => {
    // Get Values from API and set in form
    if (responseData) {
      console.log(responseData)
      form.setValue("username", responseData.username || "")
      form.setValue("role", responseData.role.toString())
      form.setValue("age", responseData.age || "")
      form.setValue("gender", responseData.gender || "")
      form.setValue("notifications", responseData.notifications || false)
      form.setValue("description", responseData.description || "")
      form.setValue("dob", new Date(responseData.dob))
      form.setValue("experience", responseData.experience || "")
      form.setValue("isActive", responseData.isActive || false)

      const defaultSelectedLocations = locations.filter((loc: Location) => loc.isSelected).map((loc: Location) => loc.id);
      form.setValue("location", defaultSelectedLocations);

      const defaultSelectedExperienceDetails = responseData.experienceDetails?.map((exp: ExperienceDetail) => ({
        companyName: exp.companyName || "",
        email: exp.email || "",
        idProof: exp.idProof?.map((exp: any) => exp.id) || [],
      }))
      form.setValue("experienceDetails", defaultSelectedExperienceDetails || [])
    }
  }, [])


  const onSubmit = (data: z.infer<typeof ComponentSchema>) => {
    console.log(data);
  };

  const appendRow = () => {
    append({
      companyName: "",
      email: "",
      idProof: []
    });
  }

  const removeRow = (index: number) => {
    remove(index);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Section 1 */}
        <div className="space-y-6 border border-gray-300 rounded-sm py-6 px-4">
          <div className="grid grid-cols-4 gap-4">

            {/* Input */}
            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username*</FormLabel>
                    <Input
                      {...field}
                      className={cn(
                        form.formState.errors.username && "border-destructive"
                      )}
                      placeholder="Enter your Username*"
                      autoComplete="off"
                    />
                    <div className="relative">
                      <FormMessage className="absolute text-xs -top-2 ml-1" />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Dropdown */}
            <div>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Role*</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value.toString()}

                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a role" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {roles?.map((role: Role) => (
                          <SelectItem key={role.id} value={role.id.toString()}>{role.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative">
                      <FormMessage className="absolute text-xs -top-2 ml-1" />
                    </div>
                  </FormItem>
                )}
              />
            </div>


            {/* Combobox */}
            <div>
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Group*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="justify-between text-sm font-normal"
                          >
                            {field.value
                              ? age?.find((f: any) => f.age == field.value)
                                ?.age
                              : "Select Age Group"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Search..." />
                          <CommandEmpty>No age found.</CommandEmpty>
                          <CommandGroup>
                            {age?.map((item: any) => (
                              <CommandItem
                                key={item.id}
                                value={item.age}
                                onSelect={() => {
                                  field.onChange(item.age);
                                }}
                              >
                                {item.age}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    item.age == field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <div className="relative">
                      <FormMessage className="absolute text-xs -top-2 ml-1" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div>
              {/* Radio group */}
              <FormField
                control={form.control}
                name="gender"
                rules={{ required: "Please select a gender" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2">Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex"
                      >
                        {gender?.map((g: Gender) => (
                          <FormItem key={g.id} className="flex items-center">
                            <FormControl>
                              <RadioGroupItem value={g.name} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {g.name}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Checkbox */}
            <div>
              <FormField
                control={form.control}
                name="notifications"
                render={({ field }) => (
                  <FormItem>
                    <FieldLabel>
                      <Field orientation="horizontal">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FieldContent>
                          <FieldTitle>Enable notifications</FieldTitle>
                          <FieldDescription>
                            You can enable or disable notifications at any time
                          </FieldDescription>
                        </FieldContent>
                      </Field>
                    </FieldLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* Textarea */}
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description"
                        {...field}
                        className="focus-visible:*:"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-6 border border-gray-300 rounded-sm py-6 px-4 mt-4">
          <div className="grid grid-cols-4 gap-x-4 mb-4">

            {/* Calendar */}
            <div>
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Birthday</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full font-normal justify-between"
                          >
                            {field.value
                              ? (format(field.value, "dd-MM-yyyy"))
                              : "Select a date"}
                            <ChevronDownIcon />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            {/* Combobox without search */}
            <div>
              <div>
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="justify-between text-sm font-normal"
                            >
                              {field.value
                                ? experiences.find((f: any) => f.years == field.value)
                                  ?.years
                                : "Select Experience"}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandGroup>
                              {experiences?.map((exp: Experience) => (
                                <CommandItem
                                  key={exp.id}
                                  value={exp.id.toString()}
                                  onSelect={() => {
                                    field.onChange(exp.years);
                                  }}
                                >
                                  {exp?.years}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      exp.years == field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <div className="relative">
                        <FormMessage className="absolute text-xs -top-2 ml-1" />
                      </div>

                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Multiselect combobox */}
            <div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => {
                  const selected = field.value || [];
                  const toggle = (id: any) => {
                    // console.log(id, selected);
                    if (selected.includes(id)) {
                      console.log("removing", id);
                      field.onChange(selected?.filter((v) => v != id));
                    } else {
                      console.log("adding", id);
                      field.onChange([...selected, id]);
                      console.log("added", id);
                    }
                  };

                  return (
                    <FormItem>
                      <FormLabel>Select Locations</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className="w-full font-normal justify-between">
                              {selected.length > 0
                                ? `${selected.length} locations selected`
                                : "Choose locations"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search locations..." />
                            <CommandEmpty>No locations found.</CommandEmpty>
                            <CommandGroup>
                              {locations?.map((loc: Location) => (
                                <CommandItem
                                  key={loc.id}
                                  value={loc.name}
                                  onSelect={() => toggle(loc.id)}
                                >
                                  <div className="flex items-center space-x-2">
                                    <Checkbox checked={selected.includes(loc?.id)} onCheckedChange={() => toggle(loc.id)}
                                    />
                                    <span>{loc.name}</span>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relocate location</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-end border-b pb-1 mb-6 border-gray-300">
              <p className="text-sm font-semibold">Experience Details</p>
              <p className="border border-gray-300 rounded-xl px-3 py-1 text-[#f05123] text-xs cursor-pointer" onClick={appendRow}>+ Add Row</p>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <FormLabel>Company Name*</FormLabel>
              <FormLabel>Email*</FormLabel>
              <FormLabel>ID Proof</FormLabel>
              <FormLabel>Action</FormLabel>
            </div>

            {fields?.map((item, index) => (
              <div key={item.id} className="grid grid-cols-4 gap-2 mb-3">
                <div>
                  <FormField
                    control={form.control}
                    name={`experienceDetails.${index}.companyName` as const}
                    render={({ field }) => (
                      <FormItem>
                        <Input
                          {...field}
                          className={cn(
                            form.formState.errors.experienceDetails?.[index]?.companyName && "border-destructive"
                          )}
                          placeholder="Enter Company Name*"
                          autoComplete="off"
                        />
                        <div className="relative">
                          <FormMessage className="absolute text-xs -top-2 ml-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name={`experienceDetails.${index}.email` as const}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a Email" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {experienceDetails?.companyEmails?.map((item: any) => (
                              <SelectItem key={item.id + 1} value={item.email}>{item.email}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="relative">
                          <FormMessage className="absolute -top-2 text-xs ml-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name={`experienceDetails.${index}.idProof` as const}
                    render={({ field }) => {
                      console.log("field value", field.value)
                      const selected = field.value || [];
                      const toggle = (id: any) => {
                        if (selected.includes(id)) {
                          console.log("removing", id);
                          field.onChange(selected?.filter((v) => v != id));
                        } else {
                          console.log("adding", id);
                          field.onChange([...selected, id]);
                          console.log("added", id);
                        }
                      };

                      return (
                        <FormItem>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant="outline" className="w-full font-normal justify-between">
                                  {selected.length > 0
                                    ? `${selected?.length} selected`
                                    : "Choose ID Proof"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search Id..." />
                                <CommandEmpty>No ID found.</CommandEmpty>
                                <CommandGroup>
                                  {experienceDetails?.idProof?.map((item) => (
                                    <CommandItem
                                      key={item.id}
                                      value={item.name}
                                      onSelect={() => toggle(item.id)}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <Checkbox checked={selected.includes(item?.id)} onCheckedChange={() => toggle(item.id)}
                                        />
                                        <span>{item.name}</span>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex items-baseline">
                  <div className="">
                    <Trash2Icon className="h-5 w-5 mt-1.5 mx-2 cursor-pointer text-red-400" onClick={() => removeRow(index)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" className="my-8 float-right cursor-pointer">Submit</Button>
      </form>
    </Form>
  )
};

export default Components;
