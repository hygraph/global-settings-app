import { useApp, Wrapper } from "@graphcms/app-sdk-react";
import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";

import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Icon,
    Input,
    Image,
    Select,
} from "@chakra-ui/react";

function FormSettings() {
    console.log(useApp());
    const {
        updateInstallation,
        // @ts-expect-error
        installation: { app, config },
    } = useApp();

    console.log(useApp());

    const [websiteUrl, setWebsiteUrl] = useState(config.websiteUrl || "");
    const [adminUrl, setAdminUrl] = useState(config.adminUrl || "");
    const [websiteTitle, setWebsiteTitle] = useState(config.websiteTitle || "");
    const [websiteDescription, setWebsiteDescription] = useState(
        config.websiteDescription || ""
    );
    const [numberProducts, setNumberProducts] = useState(
        config.numberProducts || 1
    );
    const [isLoading, setIsLoading] = useState(false);

    const onChangeWebsiteTitle = (e: any) => {
        setWebsiteTitle(e.target.value);
    };

    const onChangeWebsiteDescription = (e: any) => {
        setWebsiteDescription(e.target.value);
    };

    const onChangeWebsiteUrl = (e: any) => {
        setWebsiteUrl(e.target.value);
    };

    const onChangeAdminUrl = (e: any) => {
        setAdminUrl(e.target.value);
    };

    const onChangeNumberProducts = (e: any) => {
        setNumberProducts(e.target.value);
    };

    const onSaveConfig = () => {
        setIsLoading(true);
        updateInstallation({
            status: "COMPLETED",
            config: {
                websiteTitle,
                websiteDescription,
                websiteUrl,
                adminUrl,
                numberProducts,
            },
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <Container>
            <HStack>
                <Image src={app.avatarUrl} boxSize="20px" />
                <Heading as="h3" size="lg">
                    {app.name}
                </Heading>
            </HStack>
            <Box>
                <FormControl py={4}>
                    <FormLabel htmlFor="websiteTitle">Website Title</FormLabel>
                    <Input
                        type="text"
                        placeholder="Type your website title"
                        value={websiteTitle}
                        onChange={onChangeWebsiteTitle}
                    />
                </FormControl>
                <FormControl py={4}>
                    <FormLabel htmlFor="websiteDescription">
                        Website Description
                    </FormLabel>
                    <Input
                        type="text"
                        placeholder="Type your website description"
                        value={websiteDescription}
                        onChange={onChangeWebsiteDescription}
                    />
                </FormControl>
                <FormControl py={4}>
                    <FormLabel htmlFor="websiteUrl">Website URL</FormLabel>
                    <Input
                        type="text"
                        placeholder="https://example.com"
                        value={websiteUrl}
                        onChange={onChangeWebsiteUrl}
                    />
                </FormControl>
                <FormControl py={4}>
                    <FormLabel htmlFor="adminUrl">Admin URL</FormLabel>
                    <Input
                        type="text"
                        placeholder="https://example.com"
                        value={adminUrl}
                        onChange={onChangeAdminUrl}
                    />
                </FormControl>
                <FormControl py={4}>
                    <FormLabel htmlFor="numberProducts">
                        # of Products
                    </FormLabel>
                    <Input
                        type="number"
                        value={numberProducts}
                        onChange={onChangeNumberProducts}
                        min={1}
                    />
                </FormControl>
                <FormControl py={4}>
                    <Button
                        isLoading={isLoading}
                        loadingText="Saving..."
                        variant="solid"
                        colorScheme="purple"
                        onClick={onSaveConfig}
                    >
                        Save Settings
                    </Button>
                </FormControl>
            </Box>
        </Container>
    );
}

async function useFontAwesomeIcons(): Promise<any> {
    const query = gql`
        query getAllIcons {
            release(version: "latest") {
                version
                icons {
                    id
                    label
                }
            }
        }
    `;

    const data: any = await request("https://api.fontawesome.com/", query);
    return data;
}

export default function GlobalSettingsPage() {
    return (
        <Wrapper>
            <FormSettings />
        </Wrapper>
    );
}
