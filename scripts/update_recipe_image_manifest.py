#!/usr/bin/env python3
"""Update recipe-images.json with generated recipe image assets."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


DEFAULT_VERSION = "webstable38-image-pipeline"
DEFAULT_BASE_PATH = "images/recipes/"


class ToolError(Exception):
    """Expected user-facing CLI error."""


def parse_ids(raw: str) -> list[str]:
    ids = [item.strip() for item in raw.split(",") if item.strip()]
    if not ids:
        raise ToolError("--ids must contain at least one recipe id")
    return ids


def output_format(value: str) -> str:
    normalized = value.lower().strip()
    aliases = {"jpg": "jpeg"}
    normalized = aliases.get(normalized, normalized)
    allowed = {"webp", "png", "jpeg"}
    if normalized not in allowed:
        raise argparse.ArgumentTypeError("must be one of: webp, png, jpg, jpeg")
    return normalized


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Update recipe image manifest mappings.")
    parser.add_argument("--ids", required=True, help="Comma-separated recipe ids to map")
    parser.add_argument("--image-dir", default="images/recipes", help="Directory containing image files")
    parser.add_argument("--manifest", default="recipe-images.json", help="Path to recipe-images.json")
    parser.add_argument("--format", default="webp", type=output_format, help="Image format: webp, png, jpg, jpeg")
    parser.add_argument("--version", default=DEFAULT_VERSION, help="Manifest version label")
    parser.add_argument("--base-path", default=DEFAULT_BASE_PATH, help="Public path prefix stored in mappings")
    parser.add_argument("--allow-missing", action="store_true", help="Allow ids whose image files do not exist yet")
    parser.add_argument("--dry-run", action="store_true", help="Print summary without writing the manifest")
    return parser


def load_manifest(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"version": DEFAULT_VERSION, "basePath": DEFAULT_BASE_PATH, "format": "webp", "recipes": {}}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        raise ToolError(f"Manifest is not valid JSON: {path}: {error}") from error
    if not isinstance(data, dict):
        raise ToolError(f"Manifest root must be a JSON object: {path}")
    recipes = data.get("recipes", {})
    if not isinstance(recipes, dict):
        raise ToolError('Manifest field "recipes" must be a JSON object')
    return data


def normalized_extension(fmt: str) -> str:
    return "jpg" if fmt == "jpeg" else fmt


def normalized_base_path(raw: str) -> str:
    return raw if raw.endswith("/") else f"{raw}/"


def update_manifest(args: argparse.Namespace) -> tuple[dict[str, int], dict[str, Any]]:
    ids = parse_ids(args.ids)
    manifest_path = Path(args.manifest)
    image_dir = Path(args.image_dir)
    extension = normalized_extension(args.format)
    base_path = normalized_base_path(args.base_path)

    missing = [image_dir / f"{recipe_id}.{extension}" for recipe_id in ids if not (image_dir / f"{recipe_id}.{extension}").is_file()]
    if missing and not args.allow_missing:
        preview = "\n".join(f"- {path}" for path in missing[:20])
        more = "" if len(missing) <= 20 else f"\n... and {len(missing) - 20} more"
        raise ToolError(f"Image files are missing. Use --allow-missing to update anyway:\n{preview}{more}")

    data = load_manifest(manifest_path)
    recipes = dict(data.get("recipes", {}))
    added = 0
    existing = 0
    for recipe_id in ids:
        mapping = f"{base_path}{recipe_id}.{extension}"
        if recipe_id in recipes:
            existing += 1
        else:
            added += 1
        recipes[recipe_id] = mapping

    data["version"] = args.version
    data["basePath"] = base_path
    data["format"] = extension
    data["recipes"] = {key: recipes[key] for key in sorted(recipes)}

    counts = {"added": added, "existing": existing, "total": len(data["recipes"])}
    if not args.dry_run:
        manifest_path.parent.mkdir(parents=True, exist_ok=True)
        manifest_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return counts, data


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        counts, _data = update_manifest(args)
    except ToolError as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1

    prefix = "Dry run: " if args.dry_run else ""
    print(
        f"{prefix}manifest updated: added {counts['added']}, "
        f"existing {counts['existing']}, total {counts['total']}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
