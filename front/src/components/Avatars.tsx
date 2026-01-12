import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function Avatars() {
    return (
        <div className="flex flex-row flex-wrap items-center gap-5">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-1 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage
                        src="https://themenectar.com/salient/tether/wp-content/uploads/sites/46/2025/10/smile-800x800.webp"
                        alt="@maxleiter"
                    />
                    <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt="@evilrabbit"
                    />
                    <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage
                        src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/5d/ae/a5/c0/82/v1_E10/E107QMHG.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=90ee99113f3ad38c4bd40384bd4070de44bdf8dbce5b5d5ddddc2392483ea1c2"
                        alt="@evilrabbit"
                    />
                    <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage
                        src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/10594573-741c-46b3-9d51-440874a7c133/2560339b-c9bc-4340-b2c1-d5881728900b.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=50a69567900c8b65708996412f5842ecb506b450542c0a5aaf8c8fcf609fb42d"
                        alt="@evilrabbit"
                    />
                    <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage
                        src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/a2/67/8e/d4/b9/v1_E10/E1053SGG.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=efe5279dc39fa5e03bcb6d442c3ff905276e136e70869794bc4a9de0b7f31a08"
                        alt="@evilrabbit"
                    />
                    <AvatarFallback>ER</AvatarFallback>
                </Avatar>
            </div>
            <div>
                +1k Happy users
            </div>
        </div>
    )
}
