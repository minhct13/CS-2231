# CS-2231
This is source code for course CS2231 - Mô hình tri thức quan hệ và ứng dụng

## Prerequisites

- Python 3.6 or higher
- Docker

## Getting Started

To run the code in this repository, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/minhct13/CS-2231.git
    cd CS-2231
    ```

2. Build the Docker container:

    ```bash
    docker build -t cs-2231 .
    ```

3. Run the Docker container:

    ```bash
    docker run -it --rm -v $(pwd):/app cs-2231
    ```

4. You should now be inside the Docker container's terminal. From here, you can run any of the code in the repository.

5. When you're done, exit the container by typing `exit`.

## Usage

Here are some examples of how to use the code in this repository:

- To run the main program:

    ```bash
    python main.py
    ```

- To run the tests:

    ```bash
    python test.py
    ```

## License

This repository is licensed under the MIT License. See the `LICENSE` file for more information.
