import os


def get_file_paths(base_dir, include_paths=None, exclude_paths=None):
    """
    Получает список путей ко всем файлам в директории, с учетом включений и исключений.

    Args:
        base_dir (str): Путь к корневой директории проекта.
        include_paths (list, optional): Список путей для включения (файлов или директорий). Если None, то включаются все файлы.
        exclude_paths (list, optional): Список путей для исключения (файлов или директорий).

    Returns:
        list: Список абсолютных путей ко всем найденным файлам.
    """
    if include_paths is None:
        include_paths = ["."]

    if exclude_paths is None:
        exclude_paths = []

    all_files = []
    for root, _, files in os.walk(base_dir):
        for file in files:
            full_path = os.path.join(root, file)
            relative_path = os.path.relpath(full_path, base_dir)

            if should_include(relative_path, include_paths) and not should_exclude(relative_path, exclude_paths):
                all_files.append(full_path)

    return all_files


def should_include(relative_path, include_paths):
    """Проверяет, следует ли включить файл, основываясь на include_paths."""
    if "." in include_paths:
        return True
    for include_path in include_paths:
        if relative_path.startswith(include_path):
            return True
    return False


def should_exclude(relative_path, exclude_paths):
    """Проверяет, следует ли исключить файл, основываясь на exclude_paths."""
    for exclude_path in exclude_paths:
        if relative_path.startswith(exclude_path):
            return True
    return False


def read_and_write_file_contents(file_paths, output_file, base_dir):
    """
    Читает содержимое файлов и записывает их в выходной файл в заданном формате.

    Args:
        file_paths (list): Список путей к файлам.
        output_file (str): Путь к выходному файлу.
        base_dir (str): Базовая директория для относительных путей.
    """
    with open(output_file, "w", encoding="utf-8") as outfile:
        for file_path in file_paths:
            relative_path = os.path.relpath(file_path, base_dir)
            outfile.write(f"../{relative_path}\n")
            try:
                with open(file_path, "r", encoding="utf-8") as infile:
                    outfile.write("```\n")
                    outfile.write(infile.read())
                    outfile.write("\n```\n\n")
            except Exception as e:
                outfile.write("```\n")
                outfile.write(f"Error reading file: {e}\n")
                outfile.write("```\n\n")


if __name__ == "__main__":
    project_dir = os.getcwd()

    include_patterns = ["."]
    exclude_patterns = [
        ".git",
        ".idea",
        ".env",
        "resources",
        "cert.pem",
        "key.pem",
        "README.md",
        "static/fonts",
        "soder.txt",
        "FileTree.txt",
        "static/images",
        "COPYRIGHT.txt",
        "GOST_Type_A.ttf",
        "soder_script.py",
        "Podrobnoye_opisaniye_kazhdogo_fayla_i_papki_v_proyekte.txt",
        "Podrobnoye_opisaniye_kazhdogo_fayla_i_papki_v_proyekte.md",
        "soder1.txt",
        "soder2.txt"
    ]

    file_paths = get_file_paths(
        project_dir, include_patterns, exclude_patterns)
    read_and_write_file_contents(
        file_paths, "soder.txt", project_dir)  # Передача base_dir
    print("Содержимое файлов сохранено в soder.txt")
