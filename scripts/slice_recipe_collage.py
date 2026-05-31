#!/usr/bin/env python3
"""Slice a recipe collage grid into individual image assets."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


class ToolError(Exception):
    """Expected user-facing CLI error."""


def parse_ids(raw: str) -> list[str]:
    ids = [item.strip() for item in raw.split(",") if item.strip()]
    if not ids:
        raise ToolError("--ids must contain at least one recipe id")
    return ids


def positive_int(value: str) -> int:
    try:
        parsed = int(value)
    except ValueError as error:
        raise argparse.ArgumentTypeError("must be an integer") from error
    if parsed <= 0:
        raise argparse.ArgumentTypeError("must be greater than 0")
    return parsed


def crop_pct(value: str) -> float:
    try:
        parsed = float(value)
    except ValueError as error:
        raise argparse.ArgumentTypeError("must be a number from 0 to less than 1") from error
    if parsed < 0 or parsed >= 1:
        raise argparse.ArgumentTypeError("must be from 0 to less than 1")
    return parsed


def output_format(value: str) -> str:
    normalized = value.lower().strip()
    aliases = {"jpg": "jpeg"}
    normalized = aliases.get(normalized, normalized)
    allowed = {"webp", "png", "jpeg"}
    if normalized not in allowed:
        raise argparse.ArgumentTypeError("must be one of: webp, png, jpg, jpeg")
    return normalized


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Slice a collage grid into per-recipe image assets.",
    )
    parser.add_argument("--input", required=True, help="Path to the source collage image")
    parser.add_argument("--cols", required=True, type=positive_int, help="Number of grid columns")
    parser.add_argument("--rows", required=True, type=positive_int, help="Number of grid rows")
    parser.add_argument("--ids", required=True, help="Comma-separated recipe ids in grid order")
    parser.add_argument("--output-dir", required=True, help="Directory for generated image files")
    parser.add_argument("--format", default="webp", type=output_format, help="Output format: webp, png, jpg, jpeg")
    parser.add_argument("--quality", default=86, type=positive_int, help="Output quality for lossy formats")
    parser.add_argument("--crop-bottom-pct", default=0.0, type=crop_pct, help="Fraction to crop from the bottom of each cell")
    parser.add_argument("--overwrite", action="store_true", help="Allow replacing existing output files")
    parser.add_argument("--dry-run", action="store_true", help="Print planned files without writing them")
    return parser


def load_pillow():
    try:
        from PIL import Image
    except ImportError as error:
        raise ToolError(
            "Pillow is required for slicing images. Install it with: python3 -m pip install pillow"
        ) from error
    return Image


def validate_args(args: argparse.Namespace) -> list[str]:
    ids = parse_ids(args.ids)
    expected = args.cols * args.rows
    if len(ids) != expected:
        raise ToolError(f"--ids count must equal cols * rows: got {len(ids)}, expected {expected}")

    input_path = Path(args.input)
    if not input_path.is_file():
        raise ToolError(f"Input collage not found: {input_path}")

    if args.quality < 1 or args.quality > 100:
        raise ToolError("--quality must be from 1 to 100")

    return ids


def planned_outputs(ids: list[str], output_dir: Path, fmt: str) -> list[Path]:
    extension = "jpg" if fmt == "jpeg" else fmt
    return [output_dir / f"{recipe_id}.{extension}" for recipe_id in ids]


def ensure_no_overwrites(paths: list[Path], overwrite: bool) -> None:
    if overwrite:
        return
    existing = [path for path in paths if path.exists()]
    if existing:
        preview = "\n".join(f"- {path}" for path in existing[:20])
        more = "" if len(existing) <= 20 else f"\n... and {len(existing) - 20} more"
        raise ToolError(f"Output files already exist. Use --overwrite to replace them:\n{preview}{more}")


def slice_collage(args: argparse.Namespace) -> list[Path]:
    ids = validate_args(args)
    output_dir = Path(args.output_dir)
    outputs = planned_outputs(ids, output_dir, args.format)
    ensure_no_overwrites(outputs, args.overwrite)

    if args.dry_run:
        return outputs

    Image = load_pillow()
    output_dir.mkdir(parents=True, exist_ok=True)

    created: list[Path] = []
    with Image.open(args.input) as source:
        width, height = source.size
        cell_width = width / args.cols
        cell_height = height / args.rows

        for index, recipe_id in enumerate(ids):
            col = index % args.cols
            row = index // args.cols
            left = round(col * cell_width)
            top = round(row * cell_height)
            right = round((col + 1) * cell_width)
            bottom = round((row + 1) * cell_height)

            if args.crop_bottom_pct:
                crop_height = bottom - top
                bottom -= round(crop_height * args.crop_bottom_pct)
                if bottom <= top:
                    raise ToolError(f"--crop-bottom-pct removes the whole cell for id {recipe_id}")

            tile = source.crop((left, top, right, bottom)).convert("RGB")
            output_path = outputs[index]
            save_kwargs = {}
            if args.format in {"webp", "jpeg"}:
                save_kwargs["quality"] = args.quality
                save_kwargs["optimize"] = True
            tile.save(output_path, format=args.format.upper(), **save_kwargs)
            created.append(output_path)

    return created


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        paths = slice_collage(args)
    except ToolError as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1

    label = "Would create" if args.dry_run else "Created"
    print(f"{label} {len(paths)} file(s):")
    for path in paths:
        print(path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
