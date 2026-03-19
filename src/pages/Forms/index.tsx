import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { age } from "@/data/components"
import { category, location, occupation, options, relation } from "@/data/forms"
import { cn } from "@/lib/utils"
import { formSchema, type FormValues } from "@/schemas/forms"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type z from "zod"

type Relation = {
  id: number;
  name: string;
}

type Age = {
  id: number
  age: string;
}

const Forms = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "family",
      name: "",
      age: 0,
    },
  })

  const selectedType = form.watch("type")
  console.log("Selected Type", selectedType)

  useEffect(() => {

  }, [])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Section 1 */}
        <div className=" border rounded-sm border-gray-300">
          <div className="space-y-6 py-4 px-4">
            <p className="border-b border-gray-300 font-semibold text-sm pb-2 mb-4">Type</p>
            <div className="grid grid-cols-2 gap-4">
              {/* Radio group */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex"
                      // onChange={() => changeType(field.value)}
                      >
                        {options?.map((g: any) => (
                          <FormItem key={g.id} className="flex items-center">
                            <FormControl>
                              <RadioGroupItem value={g.name.toLocaleLowerCase()} />
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
            <div className="grid grid-cols-4 gap-4">

              {/* Input */}
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name*</FormLabel>
                      <Input
                        {...field}
                        className={cn(
                          form.formState.errors.name && "border-destructive"
                        )}
                        placeholder="Enter your Name*"
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
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age*</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value.toString()}

                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a age" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {age?.map((age: Age) => (
                            <SelectItem key={age.id} value={age.id.toString()}>{age.age}</SelectItem>
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


              {/* Dropdown */}
              < div >
                <FormField
                  control={form.control}
                  name="relation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relation*</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a relation" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {relation?.map((role: Relation) => (
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


              {/* Dropdown */}
              <div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location*</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value}

                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a age" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {location?.map((location: any) => (
                            <SelectItem key={location.id} value={location.id.toString()}>{location.name}</SelectItem>
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



              {selectedType.toLocaleLowerCase() == "family" && (
                <> < div >
                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation*</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a occupation" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {occupation?.map((occupation: any) => (
                              <SelectItem key={occupation.id} value={occupation.id.toString()}>{occupation.name}</SelectItem>
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
                  <div>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address*</FormLabel>
                          <Input
                            {...field}
                            className={cn(
                              form.formState.errors.name && "border-destructive"
                            )}
                            placeholder="Enter your Address*"
                            autoComplete="off"
                          />
                          <div className="relative">
                            <FormMessage className="absolute text-xs -top-2 ml-1" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {selectedType.toLocaleLowerCase() == "others" && (
                <>
                  < div >
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category*</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number(value))}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a category" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                              {category?.map((category: any) => (
                                <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
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
                  <div>
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <Input
                            {...field}
                            className={cn(
                              form.formState.errors.name && "border-destructive"
                            )}
                            placeholder="Enter your Notes*"
                            autoComplete="off"
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <Button type="submit" className="my-8 float-right cursor-pointer">Submit</Button>
        </div>
      </form>
    </Form >
  )
}

export default Forms
