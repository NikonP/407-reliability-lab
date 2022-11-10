import { useEffect, useState } from "react";

interface ExampleProps {
    delay: number;
}

export default function Example({ delay }: ExampleProps) {
    const [x, setX] = useState(0.0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setX(x + 1);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    });

    return (
        <div>
            <h1>Тест</h1>
            <p>x = {x}</p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et sed
                expedita, nesciunt quo rerum deserunt ducimus dolorum molestiae
                ipsum iusto consequatur ea quaerat. Animi fugit sed eveniet!
                Vitae, ipsam illo.
            </p>
        </div>
    );
}
