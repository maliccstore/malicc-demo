"use client";

import { Button, Card, Flex, Heading, Text, TextField, Grid } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface AddressFormData {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export default function AddressPage() {
    const [isEditing, setIsEditing] = useState(false);

    // Mock database state
    const [savedAddress, setSavedAddress] = useState<AddressFormData>({
        street: "123 Mock Lane",
        city: "Mock City",
        state: "Mock State",
        zipCode: "12345",
        country: "Mockland"
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AddressFormData>({
        defaultValues: savedAddress
    });

    // Reset form to saved address when entering edit mode or cancelling
    useEffect(() => {
        reset(savedAddress);
    }, [savedAddress, reset]);

    const onSubmit = async (data: AddressFormData) => {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Updated Address:", data);
        setSavedAddress(data);
        toast.success("Address updated successfully! (UI Only)");
        setIsEditing(false);
    };

    const handleCancel = () => {
        reset(savedAddress);
        setIsEditing(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Heading size="6" mb="6" className="font-light">
                My Address
            </Heading>

            <Card size="4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex direction="column" gap="4">
                        <Flex justify="between" align="center" mb="2">
                            <Heading size="4" weight="medium">
                                {isEditing ? "Edit Address" : "Current Address"}
                            </Heading>
                            {!isEditing && (
                                <Button
                                    type="button"
                                    variant="soft"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Update Address
                                </Button>
                            )}
                        </Flex>

                        <Flex direction="column" gap="4">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Street Address
                                </Text>
                                <TextField.Root
                                    size="3"
                                    disabled={!isEditing}
                                    placeholder="123 Main St"
                                    {...register("street", { required: "Street address is required" })}
                                />
                                {errors.street && (
                                    <Text color="red" size="2">
                                        {errors.street.message}
                                    </Text>
                                )}
                            </label>

                            <Grid columns="2" gap="4">
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        City
                                    </Text>
                                    <TextField.Root
                                        size="3"
                                        disabled={!isEditing}
                                        placeholder="New York"
                                        {...register("city", { required: "City is required" })}
                                    />
                                    {errors.city && (
                                        <Text color="red" size="2">
                                            {errors.city.message}
                                        </Text>
                                    )}
                                </label>

                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        State / Province
                                    </Text>
                                    <TextField.Root
                                        size="3"
                                        disabled={!isEditing}
                                        placeholder="NY"
                                        {...register("state", { required: "State is required" })}
                                    />
                                    {errors.state && (
                                        <Text color="red" size="2">
                                            {errors.state.message}
                                        </Text>
                                    )}
                                </label>
                            </Grid>

                            <Grid columns="2" gap="4">
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Zip / Postal Code
                                    </Text>
                                    <TextField.Root
                                        size="3"
                                        disabled={!isEditing}
                                        placeholder="10001"
                                        {...register("zipCode", { required: "Zip code is required" })}
                                    />
                                    {errors.zipCode && (
                                        <Text color="red" size="2">
                                            {errors.zipCode.message}
                                        </Text>
                                    )}
                                </label>

                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Country
                                    </Text>
                                    <TextField.Root
                                        size="3"
                                        disabled={!isEditing}
                                        placeholder="United States"
                                        {...register("country", { required: "Country is required" })}
                                    />
                                    {errors.country && (
                                        <Text color="red" size="2">
                                            {errors.country.message}
                                        </Text>
                                    )}
                                </label>
                            </Grid>
                        </Flex>

                        {isEditing && (
                            <Flex gap="3" justify="end" mt="4">
                                <Button
                                    variant="soft"
                                    color="gray"
                                    type="button"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                    Save Address
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                </form>
            </Card>
        </div>
    );
}
